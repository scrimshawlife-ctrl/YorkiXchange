const requiredEnv = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_APP_ENV",
] as const;

const serverOnlyEnv = ["SUPABASE_SERVICE_ROLE_KEY"] as const;

type EnvKey = typeof requiredEnv[number] | typeof serverOnlyEnv[number];

function hasEnv(key: EnvKey) {
  return Boolean(process.env[key]);
}

const missing = requiredEnv.filter((key) => !hasEnv(key));
const missingServer = serverOnlyEnv.filter((key) => !hasEnv(key));

if (missing.length) {
  // eslint-disable-next-line no-console
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

if (missingServer.length) {
  // eslint-disable-next-line no-console
  console.warn(`Warning: server-only env vars not set: ${missingServer.join(", ")}`);
}
