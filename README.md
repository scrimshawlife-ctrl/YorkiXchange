<p align="center">
  <img src="assets/header.svg" alt="YorkiXchange — Yorkie marketplace + forum" width="100%" />
</p>

<h1 align="center">YorkiXchange</h1>

<p align="center">
  <b>Yorkie marketplace + forum</b><br/>
  A modern Craigslist-style marketplace for Yorkies &amp; Yorkie essentials — with profiles, messaging, and community threads.
</p>

<p align="center">
  <a href="https://nextjs.org/">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-black" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-blue" />
  </a>
  <a href="https://tailwindcss.com/">
    <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-UI-38B2AC" />
  </a>
  <a href="https://ui.shadcn.com/">
    <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-Components-111827" />
  </a>
  <a href="https://supabase.com/">
    <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Auth%20%7C%20DB%20%7C%20Storage-3ECF8E" />
  </a>
  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
  </a>
  <a href="./.github/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/badge/CI-GitHub%20Actions-inactive" />
  </a>
  <img alt="Mobile friendly" src="https://img.shields.io/badge/Mobile-Friendly-ff69b4" />
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#quickstart">Quickstart</a> ·
  <a href="#environment-variables">Env</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#brand-assets">Brand</a> ·
  <a href="#architecture--data">Architecture</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## Brand assets

<table>
  <tr>
    <td align="center">
      <img src="assets/brand/yorkixchange-wordmark.svg" alt="YorkiXchange wordmark" width="320" /><br/>
      <sub>Wordmark · `assets/brand/yorkixchange-wordmark.svg`</sub>
    </td>
    <td align="center">
      <img src="assets/brand/yorkixchange-mark.svg" alt="YorkiXchange crest" width="140" /><br/>
      <sub>Crest · `assets/brand/yorkixchange-mark.svg`</sub>
    </td>
    <td align="center">
      <img src="assets/brand/yorkixchange-badge.svg" alt="YorkiXchange badge" width="160" /><br/>
      <sub>Badge · `assets/brand/yorkixchange-badge.svg`</sub>
    </td>
  </tr>
</table>

All assets are vector-based for crisp rendering in README and app UI. See `BRAND.md` and `/assets/brand/` for mascot, logo variants, and color palette.

---

## Features

<table>
  <tr>
    <td valign="top" width="50%">
      <h3>Marketplace</h3>
      <ul>
        <li>Create/edit listings (Yorkies, rehomes, services, accessories)</li>
        <li>Search + filters + favorites</li>
        <li>Multi-image listings (max 6 images, 5MB each)</li>
        <li>Report listings &amp; basic moderation hooks</li>
      </ul>
    </td>
    <td valign="top" width="50%">
      <h3>Community</h3>
      <ul>
        <li>Forum categories → threads → comments</li>
        <li>User profiles + custom avatars</li>
        <li>Direct messaging (buyer ↔ seller) + optional realtime</li>
        <li>Admin console for reports / threads / listings</li>
      </ul>
    </td>
  </tr>
</table>

---

## Screens

> Designed mobile-first. Nav collapses cleanly on small screens.

| Route | Purpose |
|---|---|
| `/` | Home (featured + quick search) |
| `/market` | Browse listings |
| `/market/new` | Create listing |
| `/market/[id]` | Listing detail + message seller |
| `/forum` | Forum categories |
| `/forum/c/[slug]` | Threads list |
| `/forum/t/[id]` | Thread detail |
| `/inbox` | Conversations |
| `/inbox/[id]` | Message thread |
| `/profile/[username]` | Profile |
| `/settings` | Avatar + preferences |
| `/admin` | Admin console (admin only) |

---

## Quickstart

### 1) Install

```bash
npm install
```

### 2) Create a Supabase project
- Create a new Supabase project
- Enable Email auth provider

### 3) Create tables + RLS
Run the schema in Supabase SQL Editor:
- `supabase-schema.sql`

### 4) Create Storage buckets
In Supabase Storage, create public buckets:
- `avatars`
- `listing-images`

Public-read is fine as long as write permissions are locked by Storage policies.

### 5) Environment variables
Create .env.local (copy from .env.local.example):

```
NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPABASE_PUBLIC_ANON_KEY>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=local
SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY>
```

### 6) Run

```bash
npm run dev
```

Open: http://localhost:3000

---

## Environment Variables

| Key | Required | Notes |
| --- | --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | ✅ | Supabase Project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ✅ | Public anon key |
| NEXT_PUBLIC_SITE_URL | ✅ | Used for auth redirects |
| NEXT_PUBLIC_APP_ENV | ✅ | `local` / `production` |
| SUPABASE_SERVICE_ROLE_KEY | ⚠️ | Server-only (admin APIs, jobs). Never expose to client. |
| NEXT_PUBLIC_BUILD_ID | ⛔️ | Optional provenance |
| NEXT_PUBLIC_GIT_SHA | ⛔️ | Optional provenance |

---

## Deployment

### Deploy to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/<YOUR_GITHUB_HANDLE>/YorkiXchange)

Replace `<YOUR_GITHUB_HANDLE>` with your GitHub repo path. See [docs/DEPLOY_RENDER.md](docs/DEPLOY_RENDER.md) for env vars and post-deploy checks.

### Deploy to Azure

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2F<OWNER>%2F<REPO>%2Fmain%2Finfra%2Fmain.bicep)

Azure has multiple "one click" paths depending on which infra you choose. If you’re using `azd` (recommended), see [docs/DEPLOY_AZURE.md](docs/DEPLOY_AZURE.md).

---

## Architecture &amp; Data
- Stack: Next.js App Router + TypeScript + Tailwind + shadcn/ui + Supabase
- Supabase provides: Auth, Postgres, Storage, Realtime (optional)
- RLS is enabled on all tables; users can only mutate their own data
- Messaging is scoped to conversation participants

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for table and storage details.

---

## Safety

YorkiXchange is a Yorkie-specific marketplace. Listings must follow local laws and humane standards.
- Report system supports moderation review
- Admin console supports removals and locks
- Avoid posting private contact info publicly

See [docs/SECURITY.md](docs/SECURITY.md).

---

## Mobile readiness checklist
- ✅ Tap targets ≥ 44px (buttons, dropdown triggers)
- ✅ No horizontal scroll on iPhone widths
- ✅ Nav collapses (no clipped menu items)
- ✅ Forms use inputMode for numeric fields
- ✅ Images are responsive and lazy-loaded
- ✅ Empty states include clear next actions

---

## Roadmap
- v1 (current): auth, profiles, marketplace, messaging, forum, admin console
- v1.1: saved searches, notifications, reputation/badges, moderation queue
- v2: enhanced location filtering, advanced admin tooling, verified sellers

---

<details>
  <summary><b>Customize</b> (branding / assets)</summary>

  • Header graphic path: `assets/header.svg`
  • Brand kit notes: `BRAND.md`
  • Mascot + logo components live in: `components/brand/`

</details>
