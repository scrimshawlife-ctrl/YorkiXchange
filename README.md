# YorkiXchange v1

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-RLS%20enabled-3FCF8E)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8)
![License](https://img.shields.io/badge/License-Private-lightgrey)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-green)

A Yorkie marketplace and forum built with Next.js, Supabase, and shadcn/ui.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/<YOUR_GITHUB_HANDLE>/YorkiXchange)
[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2F<OWNER>%2F<REPO>%2Fmain%2Finfra%2Fmain.bicep)

## Setup

1. **Install dependencies**:
   ```bash
   npm ci
   ```
2. **Configure Supabase**:
   - Create a Supabase project at https://supabase.com
   - Run `supabase-schema.sql` in the SQL Editor
   - Create storage buckets:
     - `avatars` (public read, owner write)
     - `listing-images` (public read, owner write)
   - Enable Email auth provider in Authentication settings
3. **Environment variables**: copy `.env.local.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_APP_ENV=local
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
   - When deploying to Render, set `NEXT_PUBLIC_SITE_URL` to your Render hostname (e.g., `https://yorkixchange.onrender.com`).
4. **Run dev server**:
   ```bash
   npm run dev
   ```
5. **Build for production**:
   ```bash
   npm run check-env
   npm run lint
   npm run typecheck
   npm run build
   npm start
   ```

## Features (v1)

- Authentication with Supabase
- Marketplace browse, filters, listing creation with multi-image uploads
- Messaging between buyers/sellers with optimistic updates
- Forum categories, threads, comments, and lock state
- Saved searches with optional alerts
- Profile editing with avatar uploads
- RLS-secured data model and storage policies
- Admin audit trail via server-side admin APIs

<details>
<summary>Architecture</summary>

- Row Level Security enforced on all tables; admin overrides gated by `public.is_admin()`
- Profiles auto-created on signup via trigger
- Storage buckets expect UUID filenames to avoid overwrites under `avatars/<user_id>/...` and `listing-images/<listing_id>/...`
- Next.js App Router with standalone output for Docker deployment
- CI runs lint, typecheck, env check, and build on every push/PR

</details>

<details>
<summary>Mobile-readiness checklist</summary>

- Responsive navigation and cards in `components/SiteNav.tsx` and marketplace UI
- Touch-friendly buttons and inputs using shadcn/ui primitives
- Image galleries avoid hover-only interactions
- Text sizes respect Tailwind defaults for mobile readability
- Test on narrow viewports (iPhone 13/Pixel widths) before release

</details>

## Docs
- [Architecture](docs/ARCHITECTURE.md)
- [Security](docs/SECURITY.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Deploy to Render](docs/DEPLOY_RENDER.md)
- [Deploy to Azure](docs/DEPLOY_AZURE.md)

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + RLS)
- **Notifications**: Sonner

## Brand Assets
See `BRAND.md` and `/assets/brand/` for mascot, logo variants, and color palette.
