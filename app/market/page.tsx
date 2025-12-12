"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import ListingCard from "@/components/ListingCard";
import SearchFilters, { Filters } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/brand/EmptyState";
import { toast } from "sonner";

type Listing = {
  id: string;
  title: string;
  price_cents: number;
  location_text: string;
  category: string;
  created_at: string;
};

export default function MarketPage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [busy, setBusy] = useState(true);
  const [filters, setFilters] = useState<Filters>({ q: "", category: "all", maxPrice: "" });

  const maxPriceCents = useMemo(() => {
    const n = Number(filters.maxPrice);
    return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : null;
  }, [filters.maxPrice]);

  useEffect(() => {
    const load = async () => {
      setBusy(true);
      let q = supabase
        .from("listings")
        .select("id,title,price_cents,location_text,category,created_at")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(50);

      if (filters.category !== "all") q = q.eq("category", filters.category);
      if (maxPriceCents !== null) q = q.lte("price_cents", maxPriceCents);
      if (filters.q.trim().length > 0) q = q.ilike("title", `%${filters.q.trim()}%`);

      const { data, error } = await q;
      setBusy(false);

      if (error) {
        toast.error(error.message);
        setItems([]);
      } else {
        setItems((data as Listing[]) ?? []);
      }
    };

    load();
  }, [filters.category, filters.q, maxPriceCents]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Marketplace</h1>
          <p className="text-sm text-muted-foreground">Yorkies and yorkie-adjacent essentials.</p>
        </div>
        <Button asChild>
          <Link href="/market/new">Post</Link>
        </Button>
      </div>

      <SearchFilters value={filters} onChange={setFilters} />

      {busy ? (
        <div className="text-sm text-muted-foreground">Loading listings...</div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No listings found"
          description="No active listings match your search criteria. Try adjusting your filters or be the first to post!"
          actionLabel="Post a Listing"
          actionHref="/market/new"
          mascotMessage="Woof! The marketplace is looking empty. Be the first to post!"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </div>
      )}
    </div>
  );
}
