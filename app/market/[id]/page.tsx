"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Listing = any;
type Profile = any;

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [session, setSession] = useState<any>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [seller, setSeller] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(true);
  const [msgBusy, setMsgBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
  }, []);

  useEffect(() => {
    const load = async () => {
      setBusy(true);
      const { data: l, error: le } = await supabase
        .from("listings")
        .select("id,user_id,title,description,category,price_cents,location_text,created_at,status")
        .eq("id", id)
        .single();

      if (le) {
        setBusy(false);
        toast.error(le.message);
        return;
      }

      setListing(l as any);

      const { data: p } = await supabase
        .from("profiles")
        .select("id,username,display_name,avatar_url")
        .eq("id", (l as any).user_id)
        .single();

      setSeller((p as any) ?? null);
      setBusy(false);
    };

    load();
  }, [id]);

  const money = (cents: number) =>
    cents <= 0 ? "Free" : new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(cents / 100);

  const startConversation = async () => {
    if (!session?.user?.id) {
      toast.error("Log in to message sellers.");
      router.push("/login");
      return;
    }
    if (!listing) return;

    const buyerId = session.user.id;
    const sellerId = listing.user_id;

    if (buyerId === sellerId) {
      toast.error("You can't message yourself. (Time travel not supported.)");
      return;
    }

    setMsgBusy(true);

    // Create-or-get conversation (unique constraint on listing_id, buyer_id, seller_id)
    const { data: convo, error: ce } = await supabase
      .from("conversations")
      .upsert(
        { listing_id: listing.id, buyer_id: buyerId, seller_id: sellerId },
        { onConflict: "listing_id,buyer_id,seller_id" }
      )
      .select("id")
      .single();

    if (ce) {
      setMsgBusy(false);
      toast.error(ce.message);
      return;
    }

    // Optional: seed a first message? We'll redirect to thread and let user type.
    setMsgBusy(false);
    router.push(`/inbox/${(convo as any).id}`);
  };

  if (busy) return <div className="text-sm text-muted-foreground">Loading…</div>;
  if (!listing) return <div className="text-sm text-muted-foreground">Not found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{listing.title}</h1>
          <p className="text-sm text-muted-foreground">
            {listing.category?.replaceAll("_", " ")} • {listing.location_text || "Location not listed"} • Posted{" "}
            {new Date(listing.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="text-lg font-semibold">{money(listing.price_cents)}</div>
      </div>

      <Card>
        <CardHeader className="font-medium">Description</CardHeader>
        <CardContent className="whitespace-pre-wrap text-sm">{listing.description}</CardContent>
      </Card>

      <Card>
        <CardHeader className="font-medium">Seller</CardHeader>
        <CardContent className="flex items-center justify-between gap-3">
          <div className="text-sm">
            <div className="font-medium">{seller?.display_name ?? "Seller"}</div>
            <div className="text-muted-foreground">@{seller?.username ?? "unknown"}</div>
          </div>
          <Button onClick={startConversation} disabled={msgBusy}>
            {msgBusy ? "Starting…" : "Message seller"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
