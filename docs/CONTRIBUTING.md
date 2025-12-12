# Contributing

## Setup
- Install Node.js 20.
- Run `npm ci`.
- Copy `.env.local.example` to `.env.local` and fill in Supabase values.

## Commands
- `npm run lint` — lint codebase
- `npm run typecheck` — TypeScript type checking
- `npm run build` — production build
- `npm run check-env` — validate required environment variables

## Guidelines
- Keep Supabase service role usage on the server only.
- Prefer server-side API routes for admin or destructive actions; record admin audits.
- Use UUID filenames for storage uploads to avoid overwriting files.
