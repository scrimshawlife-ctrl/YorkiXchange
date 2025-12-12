"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Profile = { username: string; display_name: string; avatar_url: string | null };

export default function SiteNav() {
  const [session, setSession] = useState<{ user: { id: string } } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) {
        setProfile(null);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("username,display_name,avatar_url")
        .eq("id", session.user.id)
        .single();
      setProfile(data as Profile | null);
    };
    load();
  }, [session?.user?.id]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          YorkiXchange
        </Link>

        <nav className="flex items-center gap-3">
          <Link className="text-sm hover:underline" href="/market">Market</Link>
          <Link className="text-sm hover:underline" href="/forum">Forum</Link>
          {session ? <Link className="text-sm hover:underline" href="/inbox">Inbox</Link> : null}

          {session ? (
            <div className="flex items-center gap-2">
              <Link href={`/profile/${profile?.username ?? "me"}`} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url ?? undefined} />
                  <AvatarFallback>{(profile?.display_name ?? "YF").slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm sm:inline">{profile?.display_name ?? "Account"}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm"><Link href="/login">Log in</Link></Button>
              <Button asChild size="sm"><Link href="/signup">Sign up</Link></Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
