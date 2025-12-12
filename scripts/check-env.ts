/**
 * Env validation with explicit modes.
 *
 * - "public" mode: required to build and run the web app normally (client-safe vars only).
 * - "server" mode: required only when running server-side admin APIs / jobs that use the service role key.
 *
 * Usage:
 *   node scripts/check-env.ts            # defaults to "public"
 *   node scripts/check-env.ts public
 *   node scripts/check-env.ts server
 */

const mode = (process.argv[2] ?? "public").toLowerCase();

const requiredPublic = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_APP_ENV",
];

const requiredServer = [
  "SUPABASE_SERVICE_ROLE_KEY",
];

const required = mode === "server" ? [...requiredPublic, ...requiredServer] : requiredPublic;

const missing = required.filter((k) => !process.env[k]);

if (missing.length) {
  console.error(
    `Missing required env vars for mode="${mode}": ${missing.join(", ")}`
  );
  console.error(
    mode === "server"
      ? "Hint: set SUPABASE_SERVICE_ROLE_KEY only in server environments (Render/Azure), never in client."
      : "Hint: set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY / NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_APP_ENV."
  );
  process.exit(1);
}

console.log(`Environment OK (mode="${mode}")`);
