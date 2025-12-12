import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using service role key.
 * Never import this from client components. The `server-only` import enforces this in Next.js.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(url, service, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
