"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export type AdminDashboardData = {
  reports: {
    id: string;
    reporter_id: string;
    target_type: string;
    target_id: string;
    reason: string;
    status: string;
    created_at: string;
  }[];
  listings: {
    id: string;
    title: string;
    status: string;
    user_id: string;
    created_at: string;
  }[];
  threads: {
    id: string;
    title: string;
    is_locked: boolean;
    created_at: string;
  }[];
  users: {
    id: string;
    username: string;
    status: string;
    is_admin: boolean;
    created_at: string;
  }[];
};

type ActionState = { message: string; variant: "idle" | "success" | "error" };

export default function AdminDashboard({ data }: { data: AdminDashboardData }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [state, setState] = useState<ActionState>({ message: "", variant: "idle" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: sessionData }) => {
      setAccessToken(sessionData.session?.access_token ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setAccessToken(session?.access_token ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const sortedReports = useMemo(
    () => [...data.reports].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    [data.reports]
  );

  async function perform(action: string, targetId: string, metadata?: Record<string, unknown>) {
    if (!accessToken) {
      setState({ message: "Missing admin session", variant: "error" });
      return;
    }
    const res = await fetch("/api/admin/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ action, targetId, metadata }),
    });
    const json = await res.json();
    if (!res.ok) {
      setState({ message: json.error || "Action failed", variant: "error" });
      return;
    }
    setState({ message: action.replace("_", " ") + " ok", variant: "success" });
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Admin Console</h1>
        <p className="text-sm text-muted-foreground">
          Server-authoritative actions with audit logging. Use carefully; changes are immediate.
        </p>
        {state.message ? (
          <p
            className={`text-sm ${
              state.variant === "error" ? "text-red-600" : state.variant === "success" ? "text-green-600" : ""
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Open reports</h2>
          <p className="text-xs text-muted-foreground">Latest 25</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedReports.length === 0 ? (
            <div className="col-span-full rounded-lg border p-4 text-sm text-muted-foreground">
              No reports in queue.
            </div>
          ) : (
            sortedReports.map((report) => (
              <div key={report.id} className="rounded-lg border p-4 space-y-2">
                <div className="text-sm font-medium">{report.target_type.toUpperCase()}</div>
                <div className="text-sm text-muted-foreground break-words">{report.reason}</div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>Target: {report.target_id}</span>
                  <span>Reporter: {report.reporter_id}</span>
                </div>
                <button
                  onClick={() => perform("close_report", report.id)}
                  className="w-full rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                >
                  Close report
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Listings</h2>
          <p className="text-xs text-muted-foreground">Flagged + paused</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.listings.length === 0 ? (
            <div className="col-span-full rounded-lg border p-4 text-sm text-muted-foreground">
              No paused listings.
            </div>
          ) : (
            data.listings.map((listing) => (
              <div key={listing.id} className="rounded-lg border p-4 space-y-2">
                <div className="text-sm font-medium break-words">{listing.title}</div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>Status: {listing.status}</span>
                  <span>Owner: {listing.user_id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => perform("approve_listing", listing.id)}
                    className="rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => perform("delete_listing", listing.id)}
                    className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Threads</h2>
          <p className="text-xs text-muted-foreground">Recent</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.threads.length === 0 ? (
            <div className="col-span-full rounded-lg border p-4 text-sm text-muted-foreground">
              No threads available.
            </div>
          ) : (
            data.threads.map((thread) => (
              <div key={thread.id} className="rounded-lg border p-4 space-y-2">
                <div className="text-sm font-medium break-words">{thread.title}</div>
                <div className="text-xs text-muted-foreground">{thread.is_locked ? "Locked" : "Open"}</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => perform("lock_thread", thread.id)}
                    className="rounded bg-amber-600 px-3 py-2 text-sm text-white hover:bg-amber-700"
                  >
                    Lock
                  </button>
                  <button
                    onClick={() => perform("delete_thread", thread.id)}
                    className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-xs text-muted-foreground">Recent 25</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.users.length === 0 ? (
            <div className="col-span-full rounded-lg border p-4 text-sm text-muted-foreground">
              No users found.
            </div>
          ) : (
            data.users.map((user) => (
              <div key={user.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="break-words">{user.username}</span>
                  {user.is_admin ? <span className="text-xs text-green-600">admin</span> : null}
                </div>
                <div className="text-xs text-muted-foreground">{user.status}</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => perform("ban_user", user.id)}
                    className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Ban
                  </button>
                  <button
                    onClick={() => perform("unban_user", user.id)}
                    className="rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                  >
                    Unban
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
