"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/brand/EmptyState";
import { toast } from "sonner";

type Thread = any;

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [category, setCategory] = useState<any>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const load = async () => {
      setBusy(true);

      // Load category
      const { data: cat } = await supabase
        .from("forum_categories")
        .select("*")
        .eq("slug", slug)
        .single();

      setCategory(cat ?? null);

      // Load threads
      const { data, error } = await supabase
        .from("threads")
        .select("id,user_id,title,created_at,updated_at,is_locked")
        .eq("category_slug", slug)
        .order("updated_at", { ascending: false })
        .limit(50);

      setBusy(false);

      if (error) {
        toast.error(error.message);
        return;
      }

      setThreads((data as any[]) ?? []);
    };

    load();
  }, [slug]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{category?.title ?? "Category"}</h1>
          <p className="text-sm text-muted-foreground">{category?.description ?? ""}</p>
        </div>
        <Button asChild>
          <Link href={`/forum/c/${slug}/new`}>New Thread</Link>
        </Button>
      </div>

      {busy ? (
        <div className="text-sm text-muted-foreground">Loading threads…</div>
      ) : threads.length === 0 ? (
        <EmptyState
          title="No threads yet"
          description="Be the first to start a discussion in this category! Share your thoughts, ask questions, or help others."
          actionLabel="Start New Thread"
          actionHref={`/forum/c/${slug}/new`}
          mascotMessage="This category is quiet! Start a conversation and bring the community together."
        />
      ) : (
        <div className="grid gap-3">
          {threads.map((t) => (
            <Link key={t.id} href={`/forum/t/${t.id}`}>
              <Card className="hover:shadow-sm transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{t.title}</div>
                    {t.is_locked ? (
                      <div className="mt-1 text-xs text-muted-foreground">🔒 Locked</div>
                    ) : null}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(t.updated_at).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Last activity {new Date(t.updated_at).toLocaleString()}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
