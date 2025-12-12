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

type SavedSearch = {
  id: string;
  name: string;
  query: string;
  category: string | null;
  max_price_cents: number | null;
  alerts_enabled: boolean;
};

export default function MarketPage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [busy, setBusy] = useState(true);
  const [filters, setFilters] = useState<Filters>({ q: "", category: "all", maxPrice: "" });
  const [session, setSession] = useState<any>(null);
  const [authReady, setAuthReady] = useState(false);
  const [saved, setSaved] = useState<SavedSearch[]>([]);

  const maxPriceCents = useMemo(() => {
    const n = Number(filters.maxPrice);
    return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : null;
  }, [filters.maxPrice]);

  const canSaveSearch = authReady && !!session?.user?.id;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(nextSession ?? null);
      setAuthReady(true);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadSaved = async () => {
      if (!authReady || !session?.user?.id) {
        setSaved([]);
        return;
      }

      const { data, error } = await supabase
        .from("search_preferences")
        .select("id,name,query,category,max_price_cents,alerts_enabled")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) {
        toast.error(error.message);
        return;
      }

      setSaved((data as SavedSearch[]) ?? []);
    };

    void loadSaved();
  }, [authReady, session?.user?.id]);

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

  const saveCurrentSearch = async () => {
    if (!authReady) {
      toast.error("Checking session. Please wait a moment.");
      return;
    }

    if (!session?.user?.id) {
      toast.error("Log in to save searches.");
      return;
    }

    const name = window.prompt("Name this search (3-60 chars)", filters.q || "Marketplace search");
    if (!name) return;
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters.");
      return;
    }

    const payload = {
      user_id: session.user.id,
      name: name.trim(),
      query: filters.q.trim(),
      category: filters.category === "all" ? null : filters.category,
      max_price_cents: maxPriceCents,
      alerts_enabled: true,
    };

    const { data, error } = await supabase
      .from("search_preferences")
      .insert(payload)
      .select("id,name,query,category,max_price_cents,alerts_enabled")
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setSaved((prev) => [data as SavedSearch, ...prev]);
    toast.success("Saved search created.");
  };

  const applySavedSearch = (pref: SavedSearch) => {
    const prefCategory = pref.category ? (pref.category as Filters["category"]) : null;
    setFilters({
      q: pref.query ?? "",
      category: prefCategory ?? "all",
      maxPrice: pref.max_price_cents ? String(pref.max_price_cents / 100) : "",
    });
    toast.success(`Applied ${pref.name}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Marketplace</h1>
          <p className="text-sm text-muted-foreground">Yorkies and yorkie-adjacent essentials.</p>
        </div>
        <div className="flex items-center gap-2">
          {canSaveSearch ? (
            <Button variant="outline" onClick={saveCurrentSearch}>
              Save search
            </Button>
          ) : authReady ? (
            <span className="text-xs text-muted-foreground">Log in to save searches</span>
          ) : null}
          <Button asChild>
            <Link href="/market/new">Post</Link>
          </Button>
        </div>
      </div>

      <SearchFilters value={filters} onChange={setFilters} />

      {canSaveSearch && saved.length > 0 ? (
        <div className="rounded-md border p-3">
          <div className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Saved Searches</span>
            <span className="text-xs text-muted-foreground">Alerts on by default</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((pref) => (
              <div key={pref.id} className="rounded-md border bg-muted/40 p-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{pref.name}</div>
                  {pref.alerts_enabled ? (
                    <span className="text-[11px] text-emerald-600">Alerts on</span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">Alerts off</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {pref.query ? `“${pref.query}” · ` : ""}
                  {pref.category ?? "all"}
                  {pref.max_price_cents ? ` · Under $${(pref.max_price_cents / 100).toFixed(0)}` : ""}
                </div>
                <Button className="mt-2 w-full" variant="secondary" onClick={() => applySavedSearch(pref)}>
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

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
