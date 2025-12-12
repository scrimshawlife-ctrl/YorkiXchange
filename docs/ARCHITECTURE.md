# Architecture Overview

## Stack
- Next.js 15 (App Router) with React 19
- Supabase for auth, Postgres, and Storage
- Tailwind CSS for styling

## Data Model
- `profiles`: user profile with `is_admin` flag.
- `listings` / `listing_images`: marketplace items; `listing_images` should use UUID filenames to avoid overwrites.
- `favorites`: user saved listings.
- `search_preferences`: saved searches with alert flag.
- `forum_categories`, `threads`, `comments`: forum content with lock flag on threads.
- `conversations`, `messages`: private messaging.
- `reports`: user-submitted reports.
- `admin_audit`: admin-side audit log for actions over marketplace/forum/report content.

## RLS Model
- Public read for listings (active), categories, threads, and comments; authenticated owners can mutate their own rows.
- Messaging and conversations restricted to participants.
- Storage buckets (`avatars`, `listing-images`) allow public reads, owner-only writes scoped to folder prefixes. Clients must use UUID filenames to avoid overwrites.
- Admins determined via `public.is_admin()` gain select/update/delete privileges on moderated tables with audit logging handled in server APIs.

## Supabase Clients
- Client-side: `lib/supabase/client.ts` uses anon key for user-facing requests.
- Server-side admin: route handlers in `app/api/admin/*` use the service role key strictly on the server and record to `admin_audit`.

## Deployment
- Dockerfile uses Next.js standalone output.
- Render blueprint (`render.yaml`) and Azure Container Apps config (`azure.yaml` + `infra/`) declare required environment variables.
