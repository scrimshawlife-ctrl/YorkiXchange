"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function NewThreadPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  const [session, setSession] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [category, setCategory] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(nextSession ?? null);
      setAuthChecked(true);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("forum_categories")
        .select("*")
        .eq("slug", slug)
        .single();
      setCategory(data ?? null);
    };
    load();
  }, [slug]);

  const submit = async () => {
    if (!session?.user?.id) {
      toast.error("Log in to create threads.");
      router.push("/login");
      return;
    }

    const emailVerified = Boolean(
      (session.user as any).email_confirmed_at || (session.user as any).confirmed_at
    );
    if (!emailVerified) {
      toast.error("Verify your email to post in the forum.");
      router.push("/settings");
      return;
    }

    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required.");
      return;
    }

    setBusy(true);
    const { data, error } = await supabase
      .from("threads")
      .insert({
        user_id: session.user.id,
        category_slug: slug,
        title: title.trim(),
        body: body.trim(),
      })
      .select("id")
      .single();

    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Thread created.");
    router.push(`/forum/t/${(data as any).id}`);
  };

  if (!authChecked) {
    return <div className="text-sm text-muted-foreground">Checking session…</div>;
  }

  if (!session) {
    return <div className="text-sm text-muted-foreground">Log in to create threads.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">New Thread</h1>
        <p className="text-sm text-muted-foreground">
          in {category?.title ?? slug}
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="text-sm font-medium">Title</div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thread title (5-120 characters)"
            maxLength={120}
          />
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium">Body</div>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Your question or discussion starter (20-20,000 characters)…"
            rows={10}
            maxLength={20000}
          />
        </div>

        <div className="rounded-md border p-3 text-sm text-muted-foreground">
          Forum rule: Be respectful. No spam. No breeder wars. Keep it helpful or keep it civil.
        </div>

        <Button className="w-full" onClick={submit} disabled={busy}>
          {busy ? "Creating…" : "Create Thread"}
        </Button>
      </div>
    </div>
  );
}
