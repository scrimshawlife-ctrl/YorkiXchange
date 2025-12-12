"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
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
  const router = useRouter();
  const [session, setSession] = useState<{ user: { id: string } } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [busy, setBusy] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState<(typeof CATS)[number]>("other");
  const [price, setPrice] = useState("0");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);

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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    // Validate
    const validFiles = files.filter(f => {
      if (!f.type.startsWith("image/")) {
        toast.error(`${f.name} is not an image.`);
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name} is over 5MB.`);
        return false;
      }
      return true;
    });

    setImages(prev => [...prev, ...validFiles].slice(0, 6)); // Max 6 images
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const submit = async () => {
    if (!session?.user?.id) {
      toast.error("Please log in first.");
      router.push("/login");
      return;
    }

    const emailVerified = Boolean(
      (session.user as any).email_confirmed_at || (session.user as any).confirmed_at
    );
    if (!emailVerified) {
      toast.error("Verify your email before posting a listing.");
      router.push("/settings");
      return;
    }

    if (!title.trim() || !desc.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    const priceNum = Math.max(0, Math.round((Number(price) || 0) * 100));

    setBusy(true);

    // 1. Create listing
    const { data: listing, error: listingError } = await supabase
      .from("listings")
      .insert({
        user_id: session.user.id,
        title: title.trim(),
        description: desc.trim(),
        category,
        price_cents: priceNum,
        location_text: location.trim(),
        status: "active",
      })
      .select("id")
      .single();

    if (listingError) {
      setBusy(false);
      toast.error(listingError.message);
      return;
    }

    const listingId = (listing as any).id;

    // 2. Upload images if any
    if (images.length > 0) {
      const uploadPromises = images.map(async (file, idx) => {
        const ext = file.name.split(".").pop();
        const fileName = `${listingId}/${Date.now()}_${idx}.${ext}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          return null;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("listing-images")
          .getPublicUrl(fileName);

        // Insert into listing_images table
        await supabase.from("listing_images").insert({
          listing_id: listingId,
          url: urlData.publicUrl,
          sort_order: idx,
        });

        return urlData.publicUrl;
      });

      await Promise.all(uploadPromises);
    }

    setBusy(false);
    toast.success("Listing posted!");
    router.push(`/market/${listingId}`);
  };

  if (!authChecked) {
    return <div className="text-sm text-muted-foreground">Checking session…</div>;
  }

  if (!session) {
    return <div className="text-sm text-muted-foreground">Log in to post a listing.</div>;
  }

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <h1 className="text-2xl font-semibold">Post a listing</h1>

      <Input
        placeholder="Title (e.g. Yorkie puppy rehome, harness, grooming)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={90}
      />
      <Textarea
        placeholder="Description (details, age, condition, pickup/shipping, etc.)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={6}
        maxLength={5000}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          placeholder="Price (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          inputMode="decimal"
        />
        <Input
          placeholder="Location (city / area)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={80}
        />
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

      <div className="space-y-1">
        <div className="text-sm font-medium">Images (optional, max 6)</div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          disabled={busy || images.length >= 6}
          className="text-sm"
        />
        <p className="text-xs text-muted-foreground">JPG, PNG, or GIF. Max 5MB each.</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <Card key={idx} className="relative overflow-hidden">
              <img
                src={URL.createObjectURL(img)}
                alt={`Preview ${idx + 1}`}
                className="h-24 w-full object-cover"
              />
              <button
                onClick={() => removeImage(idx)}
                className="absolute right-1 top-1 rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground"
              >
                ✕
              </button>
            </Card>
          ))}
        </div>
      )}

      <div className="rounded-md border p-3 text-sm text-muted-foreground">
        Posting rule: follow local laws, be honest, be humane. This site is Yorkie-specific, not a chaos portal.
      </div>

      <Button className="w-full" onClick={submit} disabled={busy}>
        {busy ? "Posting..." : "Post listing"}
      </Button>
    </div>
  );
}
