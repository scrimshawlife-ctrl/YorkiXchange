# YorkiXchange v1

A Yorkie marketplace and forum built with Next.js, Supabase, and shadcn/ui.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Supabase**:
   - Create a Supabase project at https://supabase.com
   - Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor
   - Create storage buckets:
     - `avatars` (public)
     - `listing-images` (public)
   - Enable Email auth provider in Authentication settings

3. **Environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_url_here
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
     ```

4. **Run dev server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Features (v1)

- ✅ User authentication (signup/login)
- ✅ Marketplace listing browse with filters (category, price, search)
- ✅ Create listings (text-only, images coming in next drop)
- ✅ Listing detail pages with seller info
- ✅ Messaging system with realtime updates
  - Message seller from listing detail
  - Inbox with conversation list
  - Thread view with live message updates
- ✅ Forum categories display
- ✅ RLS-secured database with profiles, listings, favorites, threads, comments, messages
- 🚧 Image uploads for listings and avatars (next drop)
- 🚧 Forum thread creation and comments (next drop)

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + RLS)
- **Toast notifications**: Sonner

## Architecture

- Row Level Security (RLS) enforces all data access policies
- Profiles auto-created on signup via database trigger
- Responsive design, mobile-first
- Type-safe with TypeScript throughout 
