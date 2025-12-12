import AdminDashboard, { type AdminDashboardData } from "@/components/admin/AdminDashboard";
import { getSupabaseServiceClient } from "@/lib/supabase/service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;
  if (!token) return null;
  const { data: user } = await getSupabaseServiceClient().auth.getUser(token);
  if (!user?.user) return null;
  const { data: profile } = await getSupabaseServiceClient()
    .from("profiles")
    .select("id, is_admin")
    .eq("id", user.user.id)
    .single();
  if (!profile?.is_admin) return null;
  return profile.id;
}

async function loadDashboardData(): Promise<AdminDashboardData> {
  const [{ data: reports = [] }, { data: listings = [] }, { data: threads = [] }, { data: users = [] }] =
    await Promise.all([
      getSupabaseServiceClient()
        .from("reports")
        .select("id, reporter_id, target_type, target_id, reason, status, created_at")
        .order("created_at", { ascending: false })
        .limit(25),
      getSupabaseServiceClient()
        .from("listings")
        .select("id, title, status, user_id, created_at")
        .in("status", ["paused"])
        .order("created_at", { ascending: false })
        .limit(25),
      getSupabaseServiceClient()
        .from("threads")
        .select("id, title, is_locked, created_at")
        .order("created_at", { ascending: false })
        .limit(25),
      getSupabaseServiceClient()
        .from("profiles")
        .select("id, username, status, is_admin, created_at")
        .order("created_at", { ascending: false })
        .limit(25),
    ]);

  return { reports: reports ?? [], listings: listings ?? [], threads: threads ?? [], users: users ?? [] };
}

export default async function AdminPage() {
  const adminId = await getAdminUser();
  if (!adminId) {
    redirect("/login?next=/admin");
  }

  const data = await loadDashboardData();

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <AdminDashboard data={data} />
    </main>
  );
}
