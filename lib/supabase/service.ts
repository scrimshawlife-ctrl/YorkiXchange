import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseService: SupabaseClient | null = null;

export function getSupabaseServiceClient() {
  if (supabaseService) return supabaseService;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase service client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }

  supabaseService = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return supabaseService;
}
