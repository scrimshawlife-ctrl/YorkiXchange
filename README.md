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
- ✅ Create listings with multi-image upload (max 6 images, 5MB each)
- ✅ Listing detail pages with seller info
- ✅ Messaging system with realtime updates
  - Message seller from listing detail
  - Inbox with conversation list
  - Thread view with live message updates
- ✅ Settings & Profile
  - Edit username, display name, and bio
  - Avatar upload to Supabase Storage (avatars bucket)
  - Profile picture with fallback initials
- ✅ Forum System
  - Browse categories
  - View threads in category
  - Create new threads
  - Thread detail with comments
  - Post comments on threads
  - Locked thread support
- ✅ RLS-secured database with profiles, listings, favorites, threads, comments, messages
- ✅ Listing image uploads with gallery viewer
  - Multi-image upload to Supabase Storage (listing-images bucket)
  - Image gallery component with modal lightbox
  - Navigation controls (prev/next) in full-size view

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
