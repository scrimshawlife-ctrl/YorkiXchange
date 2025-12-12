# Deploying to Render

Render uses the repository blueprint (`render.yaml`) to build and run the app as a Node service. The blueprint declares
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, and `NEXT_PUBLIC_APP_ENV` as env vars
so you can set them in Render's dashboard right after clicking the deploy button.

## Prerequisites
- A Render account
- Supabase project with the schema from `supabase-schema.sql`
- The following environment variables created on Render:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - (recommended) `NEXT_PUBLIC_SITE_URL`
  - (recommended) `NEXT_PUBLIC_APP_ENV` (`production`)
  - (server-only) `SUPABASE_SERVICE_ROLE_KEY` for admin APIs

## Steps
1. Fork or push this repo to GitHub.
2. Click the Render deploy button, swapping in your repo URL (HTTPS only):
   [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=<REPO_URL>)
3. Render will load `render.yaml` (Node runtime) with `npm ci && npm run build` and `npm run start`. Keep the default health check at `/`.
4. Add environment variables. Mark `SUPABASE_SERVICE_ROLE_KEY` as **Secret**. Set `NEXT_PUBLIC_SITE_URL` to your Render hostname (e.g., `https://yorkixchange.onrender.com`).
5. Deploy. Render injects `PORT`; the `start` script binds to that value by default.
6. After the first successful deploy, visit the live URL and confirm Supabase auth redirects are using the same `NEXT_PUBLIC_SITE_URL` you configured.

## Notes
- The app relies on Next.js standalone output; do not remove `output: "standalone"` in `next.config.ts`.
- The render blueprint enables a health check at `/` to align with Render's default probes.
- For storage uploads, ensure bucket policies from `supabase-schema.sql` are applied.
- If you change the repo name, update the deploy button link accordingly.
