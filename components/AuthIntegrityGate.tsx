"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const RESTRICTED_PATTERNS = [/^\/market\/new(\/)?$/, /^\/forum\/c\/[^/]+\/new(\/)?$/];

export default function AuthIntegrityGate() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [session, setSession] = useState<ReturnType<typeof createSessionSnapshot> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(createSessionSnapshot(data.session));
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(createSessionSnapshot(nextSession));
      setReady(true);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const restricted = useMemo(() => RESTRICTED_PATTERNS.some((re) => re.test(pathname)), [pathname]);

  useEffect(() => {
    if (!ready || !restricted) return;

    if (!session) {
      toast.error("Log in to post or comment.");
      router.replace("/login");
      return;
    }

    if (!session.emailConfirmed) {
      toast.error("Verify your email to continue. Check your inbox for the confirmation link.");
      router.replace("/settings");
    }
  }, [ready, restricted, session, router]);

  return null;
}

function createSessionSnapshot(session: any | null) {
  if (!session?.user) return null;
  const user = session.user;
  return {
    raw: session,
    emailConfirmed: Boolean(user.email_confirmed_at || (user as any).confirmed_at),
    id: user.id as string,
  };
}
