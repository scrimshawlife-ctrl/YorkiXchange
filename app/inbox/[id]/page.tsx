"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type Msg = any;

export default function ThreadPage() {
  const params = useParams<{ id: string }>();
  const convoId = params.id;

  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(true);
  const [sendBusy, setSendBusy] = useState(false);
  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
  }, []);

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) {
        setBusy(false);
        setMessages([]);
        return;
      }

      setBusy(true);
      const { data, error } = await supabase
        .from("messages")
        .select("id,conversation_id,sender_id,body,created_at,read_at")
        .eq("conversation_id", convoId)
        .order("created_at", { ascending: true });

      setBusy(false);

      if (error) {
        toast.error(error.message);
        return;
      }
      setMessages((data as any[]) ?? []);
      setTimeout(scrollBottom, 50);
    };

    load();
  }, [session?.user?.id, convoId]);

  // Realtime updates (optional but nice)
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel(`messages:${convoId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${convoId}` },
        (payload) => {
          setMessages((m) => [...m, payload.new as any]);
          setTimeout(scrollBottom, 50);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, convoId]);

  const send = async () => {
    if (!session?.user?.id) {
      toast.error("Log in to send messages.");
      return;
    }
    const body = text.trim();
    if (!body) return;

    setSendBusy(true);
    const { error } = await supabase.from("messages").insert({
      conversation_id: convoId,
      sender_id: session.user.id,
      body,
    });
    setSendBusy(false);

    if (error) toast.error(error.message);
    else setText("");
  };

  if (!session) return <div className="text-sm text-muted-foreground">Log in to view this thread.</div>;

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold">Conversation</h1>
        <p className="text-sm text-muted-foreground">Keep it respectful. This isn't a cage match.</p>
      </div>

      <Card className="p-3">
        {busy ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : messages.length === 0 ? (
          <div className="text-sm text-muted-foreground">No messages yet. Start the thread.</div>
        ) : (
          <div className="max-h-[55vh] overflow-y-auto space-y-2 pr-1">
            {messages.map((m) => {
              const mine = m.sender_id === session.user.id;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      mine ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.body}</div>
                    <div className={`mt-1 text-[11px] opacity-70 ${mine ? "text-primary-foreground" : ""}`}>
                      {new Date(m.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </Card>

      <div className="space-y-2">
        <Textarea
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <Button className="w-full" onClick={send} disabled={sendBusy}>
          {sendBusy ? "Sending…" : "Send"}
        </Button>
      </div>
    </div>
  );
}
