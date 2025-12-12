"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CATS = [
  "yorkies_for_sale",
  "rehoming",
  "stud_service",
  "grooming",
  "accessories",
  "food_health",
  "rescue_adoption",
  "other",
] as const;

export default function NewListingPage() {
  const [session, setSession] = useState<{ user: { id: string } } | null>(null);
  const [busy, setBusy] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState<(typeof CATS)[number]>("other");
  const [price, setPrice] = useState("0");
  const [location, setLocation] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
  }, []);

  const submit = async () => {
    if (!session?.user?.id) {
      toast.error("Please log in first.");
      return;
    }

    const priceNum = Math.max(0, Math.round((Number(price) || 0) * 100));

    setBusy(true);
    const { error } = await supabase.from("listings").insert({
      user_id: session.user.id,
      title,
      description: desc,
      category,
      price_cents: priceNum,
      location_text: location,
      status: "active",
    });
    setBusy(false);

    if (error) toast.error(error.message);
    else toast.success("Listing posted.");
  };

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <h1 className="text-2xl font-semibold">Post a listing</h1>

      <Input placeholder="Title (e.g. Yorkie puppy rehome, harness, grooming)" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Description (details, age, condition, pickup/shipping, etc.)" value={desc} onChange={(e) => setDesc(e.target.value)} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input placeholder="Price (USD)" value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" />
        <Input placeholder="Location (city / area)" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="space-y-1">
        <div className="text-sm font-medium">Category</div>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof CATS[number])}
        >
          {CATS.map((c) => (
            <option key={c} value={c}>
              {c.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-md border p-3 text-sm text-muted-foreground">
        Posting rule: follow local laws, be honest, be humane. This site is Yorkie-specific, not a chaos portal.
      </div>

      <Button className="w-full" onClick={submit} disabled={busy}>
        {busy ? "Posting..." : "Post listing"}
      </Button>
    </div>
  );
}
