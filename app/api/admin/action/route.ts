import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase/service";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const requestLog = new Map<string, number[]>();

type AdminAction =
  | "approve_listing"
  | "suspend_listing"
  | "delete_listing"
  | "lock_thread"
  | "delete_thread"
  | "close_report"
  | "ban_user"
  | "unban_user";

type Body = {
  action: AdminAction;
  targetId: string;
  metadata?: Record<string, unknown>;
};

function rateLimit(identifier: string) {
  const now = Date.now();
  const entries = (requestLog.get(identifier) || []).filter((ts) => now - ts < WINDOW_MS);
  entries.push(now);
  requestLog.set(identifier, entries);
  if (entries.length > MAX_REQUESTS) {
    return false;
  }
  return true;
}

async function assertAdmin(accessToken: string) {
  const { data, error } = await getSupabaseServiceClient().auth.getUser(accessToken);
  if (error || !data?.user) return null;
  const { data: profile } = await getSupabaseServiceClient()
    .from("profiles")
    .select("id, is_admin, role")
    .eq("id", data.user.id)
    .single();
  if (!profile || !(profile.is_admin || profile.role === "admin")) return null;
  return profile.id;
}

async function audit(actorId: string, action: AdminAction, targetType: string, targetId: string, metadata?: Body["metadata"]) {
  await getSupabaseServiceClient()
    .from("admin_audit")
    .insert({
      actor_id: actorId,
      action,
      target_type: targetType,
      target_id: targetId,
      metadata: metadata || {},
    });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : "";
  if (!token) {
    return NextResponse.json({ error: "missing_token" }, { status: 401 });
  }

  const body = (await req.json()) as Body;
  if (!body?.action || !body?.targetId) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const actorId = await assertAdmin(token);
  if (!actorId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  if (body.action === "approve_listing") {
    const { error } = await getSupabaseServiceClient()
      .from("listings")
      .update({ status: "active" })
      .eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "listing", body.targetId, body.metadata);
    return NextResponse.json({ status: "approved" });
  }

  if (body.action === "suspend_listing") {
    const { error } = await getSupabaseServiceClient()
      .from("listings")
      .update({ status: "paused" })
      .eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "listing", body.targetId, body.metadata);
    return NextResponse.json({ status: "suspended" });
  }

  if (body.action === "delete_listing") {
    const { error } = await getSupabaseServiceClient().from("listings").delete().eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "listing", body.targetId, body.metadata);
    return NextResponse.json({ status: "deleted" });
  }

  if (body.action === "lock_thread") {
    const { error } = await getSupabaseServiceClient()
      .from("threads")
      .update({ is_locked: true })
      .eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "thread", body.targetId, body.metadata);
    return NextResponse.json({ status: "locked" });
  }

  if (body.action === "delete_thread") {
    const { error } = await getSupabaseServiceClient().from("threads").delete().eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "thread", body.targetId, body.metadata);
    return NextResponse.json({ status: "deleted" });
  }

  if (body.action === "close_report") {
    const { error } = await getSupabaseServiceClient()
      .from("reports")
      .update({ status: "closed" })
      .eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "report", body.targetId, body.metadata);
    return NextResponse.json({ status: "closed" });
  }

  if (body.action === "ban_user") {
    const { error } = await getSupabaseServiceClient()
      .from("profiles")
      .update({ status: "banned" })
      .eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "user", body.targetId, body.metadata);
    return NextResponse.json({ status: "banned" });
  }

  if (body.action === "unban_user") {
    const { error } = await getSupabaseServiceClient()
      .from("profiles")
      .update({ status: "active" })
      .eq("id", body.targetId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    await audit(actorId, body.action, "user", body.targetId, body.metadata);
    return NextResponse.json({ status: "unbanned" });
  }

  return NextResponse.json({ error: "unsupported_action" }, { status: 400 });
}
