"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type Comment = any;

export default function ThreadPage() {
  const params = useParams<{ id: string }>();
  const threadId = params.id;

  const [session, setSession] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [busy, setBusy] = useState(true);
  const [commentBusy, setCommentBusy] = useState(false);

  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
  }, []);

  useEffect(() => {
    const load = async () => {
      setBusy(true);

      // Load thread
      const { data: t } = await supabase
        .from("threads")
        .select("*")
        .eq("id", threadId)
        .single();

      setThread(t ?? null);

      // Load comments
      const { data, error } = await supabase
        .from("comments")
        .select("id,user_id,body,created_at")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

      setBusy(false);

      if (error) {
        toast.error(error.message);
        return;
      }

      setComments((data as any[]) ?? []);
    };

    load();
  }, [threadId]);

  const postComment = async () => {
    if (!session?.user?.id) {
      toast.error("Log in to comment.");
      return;
    }

    if (thread?.is_locked) {
      toast.error("This thread is locked.");
      return;
    }

    const body = commentBody.trim();
    if (!body) return;

    setCommentBusy(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({
        thread_id: threadId,
        user_id: session.user.id,
        body,
      })
      .select("id,user_id,body,created_at")
      .single();

    setCommentBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setComments([...comments, data as any]);
    setCommentBody("");
    toast.success("Comment posted.");
  };

  if (busy) return <div className="text-sm text-muted-foreground">Loading…</div>;
  if (!thread) return <div className="text-sm text-muted-foreground">Thread not found.</div>;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">{thread.title}</h1>
        <p className="text-sm text-muted-foreground">
          Posted {new Date(thread.created_at).toLocaleDateString()}
          {thread.is_locked ? " • 🔒 Locked" : ""}
        </p>
      </div>

      <Card>
        <CardHeader className="font-medium">Original Post</CardHeader>
        <CardContent className="whitespace-pre-wrap text-sm">{thread.body}</CardContent>
      </Card>

      <Separator />

      <div>
        <div className="mb-3 font-medium">{comments.length} Comment{comments.length === 1 ? "" : "s"}</div>

        {comments.length === 0 ? (
          <div className="text-sm text-muted-foreground">No comments yet. Be the first!</div>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <Card key={c.id}>
                <CardContent className="pt-4">
                  <div className="whitespace-pre-wrap text-sm">{c.body}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {new Date(c.created_at).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {session && !thread.is_locked ? (
        <Card>
          <CardHeader className="font-medium">Add a Comment</CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Your thoughtful reply…"
              rows={4}
              maxLength={8000}
            />
            <Button className="w-full" onClick={postComment} disabled={commentBusy}>
              {commentBusy ? "Posting…" : "Post Comment"}
            </Button>
          </CardContent>
        </Card>
      ) : !session ? (
        <div className="text-sm text-muted-foreground">Log in to comment.</div>
      ) : (
        <div className="text-sm text-muted-foreground">This thread is locked.</div>
      )}
    </div>
  );
}
