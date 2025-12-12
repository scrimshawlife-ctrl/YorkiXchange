"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Row = any;

export default function InboxPage() {
  const [session, setSession] = useState<any>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) {
        setBusy(false);
        setRows([]);
        return;
      }

      setBusy(true);

      // Pull conversations where user is buyer or seller
      const { data, error } = await supabase
        .from("conversations")
        .select("id,listing_id,buyer_id,seller_id,created_at")
        .or(`buyer_id.eq.${session.user.id},seller_id.eq.${session.user.id}`)
        .order("created_at", { ascending: false });

      if (error) {
        setBusy(false);
        toast.error(error.message);
        return;
      }

      // For a clean v1, we'll enrich client-side with listing titles + other user display names.
      const convos = (data as any[]) ?? [];

      const listingIds = [...new Set(convos.map((c) => c.listing_id).filter(Boolean))];
      const otherIds = [
        ...new Set(
          convos
            .map((c) => (c.buyer_id === session.user.id ? c.seller_id : c.buyer_id))
            .filter(Boolean)
        ),
      ];

      const [listingsRes, profilesRes] = await Promise.all([
        listingIds.length
          ? supabase.from("listings").select("id,title").in("id", listingIds)
          : Promise.resolve({ data: [] as any[] } as any),
        otherIds.length
          ? supabase.from("profiles").select("id,display_name,username").in("id", otherIds)
          : Promise.resolve({ data: [] as any[] } as any),
      ]);

      const listingsById = new Map((listingsRes.data ?? []).map((l: any) => [l.id, l]));
      const profById = new Map((profilesRes.data ?? []).map((p: any) => [p.id, p]));

      const enriched = convos.map((c) => {
        const otherId = c.buyer_id === session.user.id ? c.seller_id : c.buyer_id;
        const listing = c.listing_id ? listingsById.get(c.listing_id) : null;
        return {
          ...c,
          listing_title: listing ? (listing as any).title ?? "Listing" : "Direct message",
          other: profById.get(otherId) ?? null,
        };
      });

      setRows(enriched);
      setBusy(false);
    };

    load();
  }, [session?.user?.id]);

  if (!session) {
    return <div className="text-sm text-muted-foreground">Log in to view messages.</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Inbox</h1>
        <p className="text-sm text-muted-foreground">Your conversations.</p>
      </div>

      {busy ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="text-sm text-muted-foreground">No conversations yet.</div>
      ) : (
        <div className="grid gap-3">
          {rows.map((c) => (
            <Link key={c.id} href={`/inbox/${c.id}`}>
              <Card className="hover:shadow-sm transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{c.listing_title}</div>
                    <div className="text-sm text-muted-foreground">
                      With {c.other?.display_name ?? c.other?.username ?? "User"}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Open thread →
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
