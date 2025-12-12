# Deploying to Render

Render uses the repository's `Dockerfile` to build and run the app as a web service.

## Prerequisites
- A Render account
- Supabase project with the schema from `supabase-schema.sql`
- The following environment variables created on Render:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_APP_ENV`
  - `SUPABASE_SERVICE_ROLE_KEY` (for admin APIs, server-only)

## Steps
1. Fork or push this repo to GitHub.
2. Click the Render deploy button, swapping in your repo URL (HTTPS only):
   [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/<YOUR_GITHUB_HANDLE>/YorkiExchange)
3. Pick **Docker** when prompted (the `render.yaml` blueprint will pre-fill this) and leave the default build/run commands (Render uses the `Dockerfile`).
4. Add environment variables. Mark `SUPABASE_SERVICE_ROLE_KEY` as **Secret**. Set `NEXT_PUBLIC_SITE_URL` to your Render hostname (e.g., `https://yorkiexchange.onrender.com`).
5. Deploy. Render will build the Docker image, run health checks at `/`, and start the service on the port Render assigns via the `PORT` env var.
6. After the first successful deploy, visit the live URL and confirm Supabase auth redirects are using the same `NEXT_PUBLIC_SITE_URL` you configured.

## Notes
- The app relies on Next.js standalone output; do not remove `output: "standalone"` in `next.config.ts`.
- The render blueprint enables a health check at `/` to align with Render's default probes.
- For storage uploads, ensure bucket policies from `supabase-schema.sql` are applied.
- If you change the repo name, update the deploy button link accordingly.
