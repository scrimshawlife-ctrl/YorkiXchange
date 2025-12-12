"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type Msg = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
  read_at?: string | null;
};

type LocalMsg = Msg & {
  localId?: string;
  status?: "sending" | "failed" | "sent";
  retryCount?: number;
  errorMessage?: string;
};

export default function ThreadPage() {
  const params = useParams<{ id: string }>();
  const convoId = params.id;

  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<LocalMsg[]>([]);
  const [busy, setBusy] = useState(true);
  const [sendBusy, setSendBusy] = useState(false);
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(nextSession ?? null);
      setReady(true);
    });

    return () => listener?.subscription.unsubscribe();
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
      setMessages(((data as Msg[]) ?? []).map((m) => ({ ...m, status: "sent" })));
      setTimeout(scrollBottom, 50);
    };

    if (ready) void load();
  }, [session?.user?.id, convoId, ready]);

  // Realtime updates (optional but nice)
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel(`messages:${convoId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${convoId}` },
        (payload) => {
          const incoming = payload.new as Msg;
          setMessages((m) => {
            if (m.some((msg) => msg.id === incoming.id || msg.localId === incoming.id)) return m;
            return [...m, { ...incoming, status: "sent" }];
          });
          setTimeout(scrollBottom, 50);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, convoId]);

  const persistMessage = async (msg: LocalMsg) => {
    if (!session?.user?.id) {
      toast.error("Session missing. Please log in again.");
      return;
    }

    const retryCount = msg.retryCount ?? 0;
    const backoffMs = Math.min(2000 * Math.pow(2, retryCount), 8000);
    if (retryCount > 0) await new Promise((res) => setTimeout(res, backoffMs));

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: convoId,
        sender_id: session.user.id,
        body: msg.body,
      })
      .select("id,conversation_id,sender_id,body,created_at,read_at")
      .single();

    if (error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.localId === msg.localId
            ? {
                ...m,
                status: "failed",
                errorMessage: error.message,
                retryCount: (m.retryCount ?? 0) + 1,
              }
            : m
        )
      );
      toast.error(error.message);
      return;
    }

    const inserted = data as Msg;
    setMessages((prev) =>
      prev.map((m) =>
        m.localId === msg.localId
          ? {
              ...inserted,
              status: "sent",
            }
          : m
      )
    );
  };

  const send = async () => {
    if (!session?.user?.id) {
      toast.error("Log in to send messages.");
      return;
    }
    const body = text.trim();
    if (!body) return;

    const tempId = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const optimistic: LocalMsg = {
      id: tempId,
      localId: tempId,
      conversation_id: convoId,
      sender_id: session.user.id,
      body,
      created_at: new Date().toISOString(),
      status: "sending",
      retryCount: 0,
    };

    setMessages((prev) => [...prev, optimistic]);
    setText("");
    setSendBusy(true);
    setTimeout(scrollBottom, 30);

    await persistMessage(optimistic);
    setSendBusy(false);
  };

  const retrySend = async (localId: string | undefined) => {
    if (!localId) return;
    const msg = messages.find((m) => m.localId === localId);
    if (!msg) return;
    await persistMessage({ ...msg, status: "sending", retryCount: (msg.retryCount ?? 0) + 1 });
  };

  if (!ready) return <div className="text-sm text-muted-foreground">Loading session…</div>;
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
                <div key={m.localId ?? m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      mine ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.body}</div>
                    <div
                      className={`mt-1 flex items-center gap-2 text-[11px] opacity-80 ${
                        mine ? "text-primary-foreground" : ""
                      }`}
                    >
                      <span>{new Date(m.created_at).toLocaleString()}</span>
                      {mine && m.status && m.status !== "sent" ? (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                          {m.status === "sending" ? "Sending" : "Failed"}
                        </span>
                      ) : null}
                      {mine && m.status === "failed" ? (
                        <button
                          onClick={() => retrySend(m.localId)}
                          className="rounded border border-white/30 px-2 py-0.5 text-[10px] hover:bg-white/10"
                        >
                          Retry
                        </button>
                      ) : null}
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
