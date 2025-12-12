"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type Cat = { slug: string; title: string; description: string };

export default function ForumHome() {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    supabase.from("forum_categories").select("slug,title,description").then(({ data }) => setCats((data as Cat[]) ?? []));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Forum</h1>
        <p className="text-sm text-muted-foreground">Talk Yorkies. Be civil. No weird breeder wars.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {cats.map((c) => (
          <Link key={c.slug} href={`/forum/c/${c.slug}`}>
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader className="font-medium">{c.title}</CardHeader>
              <CardContent className="text-sm text-muted-foreground">{c.description}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
