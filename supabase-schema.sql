-- YORKIXCHANGE // SCHEMA v1
-- Deterministic, minimal, RLS-secured.

create extension if not exists "pgcrypto";

-- ---------- enums ----------
do $$ begin
  create type listing_status as enum ('active','sold','paused');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type listing_category as enum (
    'yorkies_for_sale',
    'rehoming',
    'stud_service',
    'grooming',
    'accessories',
    'food_health',
    'rescue_adoption',
    'other'
  );
exception when duplicate_object then null;
end $$;

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) >= 3 and char_length(username) <= 24),
  display_name text not null check (char_length(display_name) >= 1 and char_length(display_name) <= 40),
  avatar_url text,
  bio text check (char_length(bio) <= 280),
  is_admin boolean not null default false,
  role text not null default 'user',
  status text not null default 'active' check (status in ('active','banned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce((
    select (role = 'admin') or is_admin from public.profiles where id = auth.uid()
  ), false);
$$;

create index if not exists idx_profiles_role on public.profiles(role);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    'user_' || substr(new.id::text, 1, 8),
    'Yorki Friend',
    null
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- ---------- listings ----------
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 5 and 90),
  description text not null check (char_length(description) between 20 and 5000),
  category listing_category not null default 'other',
  price_cents int not null default 0 check (price_cents >= 0),
  location_text text not null default '' check (char_length(location_text) <= 80),
  status listing_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_listings_updated_at on public.listings;
create trigger trg_listings_updated_at
before update on public.listings
for each row execute procedure public.set_updated_at();

create index if not exists idx_listings_status_created on public.listings(status, created_at desc);
create index if not exists idx_listings_category on public.listings(category);
create index if not exists idx_listings_user on public.listings(user_id);

-- ---------- listing_images ----------
create table if not exists public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_listing_images_listing on public.listing_images(listing_id);

-- ---------- favorites ----------
create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

-- ---------- search_preferences ----------
create table if not exists public.search_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null check (char_length(name) between 3 and 60),
  query text not null default '',
  category listing_category,
  max_price_cents int check (max_price_cents is null or max_price_cents >= 0),
  alerts_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_search_preferences_user on public.search_preferences(user_id, created_at desc);

-- ---------- forum ----------
create table if not exists public.forum_categories (
  slug text primary key,
  title text not null,
  description text not null default ''
);

insert into public.forum_categories (slug, title, description)
values
  ('general', 'General', 'YorkiXchange general discussion'),
  ('care', 'Care & Health', 'Grooming, health, food, training'),
  ('rehoming', 'Rehoming & Rescue', 'Supportive rehome/rescue talk'),
  ('market_tips', 'Marketplace Tips', 'Buying/selling best practices')
on conflict (slug) do nothing;

create table if not exists public.threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category_slug text not null references public.forum_categories(slug) on delete restrict,
  title text not null check (char_length(title) between 5 and 120),
  body text not null check (char_length(body) between 20 and 20000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_locked boolean not null default false
);

drop trigger if exists trg_threads_updated_at on public.threads;
create trigger trg_threads_updated_at
before update on public.threads
for each row execute procedure public.set_updated_at();

create index if not exists idx_threads_category_created on public.threads(category_slug, created_at desc);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 8000),
  created_at timestamptz not null default now()
);

create index if not exists idx_comments_thread_created on public.comments(thread_id, created_at asc);

-- ---------- messaging ----------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete set null,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(listing_id, buyer_id, seller_id)
);

create index if not exists idx_conversations_buyer on public.conversations(buyer_id, created_at desc);
create index if not exists idx_conversations_seller on public.conversations(seller_id, created_at desc);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 8000),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists idx_messages_convo_created on public.messages(conversation_id, created_at asc);

-- ---------- reports / moderation ----------
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null check (target_type in ('listing','thread','comment','user')),
  target_id uuid not null,
  reason text not null check (char_length(reason) between 5 and 500),
  created_at timestamptz not null default now(),
  status text not null default 'open' check (status in ('open','reviewed','closed'))
);

create table if not exists public.admin_audit (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------- RLS ----------
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.favorites enable row level security;
alter table public.search_preferences enable row level security;
alter table public.forum_categories enable row level security;
alter table public.threads enable row level security;
alter table public.comments enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;
alter table public.admin_audit enable row level security;

-- profiles
drop policy if exists "profiles_read_all" on public.profiles;
create policy "profiles_read_all"
on public.profiles for select
to public
using (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id and role = 'user')
with check (auth.uid() = id and status = 'active' and role = 'user' and is_admin = false);

drop policy if exists "profiles_admin_override" on public.profiles;
create policy "profiles_admin_override"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- listings
drop policy if exists "listings_read_active" on public.listings;
create policy "listings_read_active"
on public.listings for select
to public
using (status = 'active' or auth.uid() = user_id);

drop policy if exists "listings_insert_own" on public.listings;
create policy "listings_insert_own"
on public.listings for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "listings_update_own" on public.listings;
create policy "listings_update_own"
on public.listings for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "listings_delete_own" on public.listings;
create policy "listings_delete_own"
on public.listings for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "listings_admin_override" on public.listings;
create policy "listings_admin_override"
on public.listings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- listing_images
drop policy if exists "listing_images_read_public" on public.listing_images;
create policy "listing_images_read_public"
on public.listing_images for select
to public
using (true);

drop policy if exists "listing_images_write_owner" on public.listing_images;
create policy "listing_images_write_owner"
on public.listing_images for all
to authenticated
using (
  exists (
    select 1 from public.listings l
    where l.id = listing_images.listing_id
      and l.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.listings l
    where l.id = listing_images.listing_id
      and l.user_id = auth.uid()
  )
);

-- favorites
drop policy if exists "favorites_read_own" on public.favorites;
create policy "favorites_read_own"
on public.favorites for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "favorites_write_own" on public.favorites;
create policy "favorites_write_own"
on public.favorites for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own"
on public.favorites for delete
to authenticated
using (auth.uid() = user_id);

-- search_preferences
drop policy if exists "search_preferences_read_own" on public.search_preferences;
create policy "search_preferences_read_own"
on public.search_preferences for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "search_preferences_insert_own" on public.search_preferences;
create policy "search_preferences_insert_own"
on public.search_preferences for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "search_preferences_update_own" on public.search_preferences;
create policy "search_preferences_update_own"
on public.search_preferences for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "search_preferences_delete_own" on public.search_preferences;
create policy "search_preferences_delete_own"
on public.search_preferences for delete
to authenticated
using (auth.uid() = user_id);

-- forum_categories read all
drop policy if exists "forum_categories_read_all" on public.forum_categories;
create policy "forum_categories_read_all"
on public.forum_categories for select
to public
using (true);

-- threads
drop policy if exists "threads_read_all" on public.threads;
create policy "threads_read_all"
on public.threads for select
to public
using (true);

drop policy if exists "threads_insert_auth" on public.threads;
create policy "threads_insert_auth"
on public.threads for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "threads_update_own_if_unlocked" on public.threads;
create policy "threads_update_own_if_unlocked"
on public.threads for update
to authenticated
using (auth.uid() = user_id and is_locked = false)
with check (auth.uid() = user_id and is_locked = false);

drop policy if exists "threads_admin_override" on public.threads;
create policy "threads_admin_override"
on public.threads for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- comments
drop policy if exists "comments_read_all" on public.comments;
create policy "comments_read_all"
on public.comments for select
to public
using (true);

drop policy if exists "comments_insert_auth" on public.comments;
create policy "comments_insert_auth"
on public.comments for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "comments_update_own" on public.comments;
create policy "comments_update_own"
on public.comments for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "comments_delete_own" on public.comments;
create policy "comments_delete_own"
on public.comments for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "comments_admin_override" on public.comments;
create policy "comments_admin_override"
on public.comments for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- conversations: participants only
drop policy if exists "conversations_select_participants" on public.conversations;
create policy "conversations_select_participants"
on public.conversations for select
to authenticated
using (auth.uid() = buyer_id or auth.uid() = seller_id);

drop policy if exists "conversations_insert_buyer_or_seller" on public.conversations;
create policy "conversations_insert_buyer_or_seller"
on public.conversations for insert
to authenticated
with check (auth.uid() = buyer_id or auth.uid() = seller_id);

-- messages: participants only via conversation
drop policy if exists "messages_select_participants" on public.messages;
create policy "messages_select_participants"
on public.messages for select
to authenticated
using (
  exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id
      and (auth.uid() = c.buyer_id or auth.uid() = c.seller_id)
  )
);

drop policy if exists "messages_insert_participants" on public.messages;
create policy "messages_insert_participants"
on public.messages for insert
to authenticated
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id
      and (auth.uid() = c.buyer_id or auth.uid() = c.seller_id)
  )
);

-- reports: auth can create; only reporter can read their own (admin later)
drop policy if exists "reports_insert_auth" on public.reports;
create policy "reports_insert_auth"
on public.reports for insert
to authenticated
with check (auth.uid() = reporter_id);

drop policy if exists "reports_read_own" on public.reports;
create policy "reports_read_own"
on public.reports for select
to authenticated
using (auth.uid() = reporter_id);

drop policy if exists "reports_admin_all" on public.reports;
create policy "reports_admin_all"
on public.reports for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin_audit_admin_read" on public.admin_audit;
create policy "admin_audit_admin_read"
on public.admin_audit for select
to authenticated
using (public.is_admin());

-- ---------- STORAGE (avatars + listing images) ----------
-- Create buckets in Storage UI:
-- 1) avatars (public)
-- 2) listing-images (public)

-- Storage policies use the storage.objects table
-- Note: run these after creating buckets.

-- Avatars: anyone can read, only owner can write under folder user_id/*
drop policy if exists "avatars_read_public" on storage.objects;
create policy "avatars_read_public"
on storage.objects for select
to public
using (bucket_id = 'avatars');

drop policy if exists "avatars_write_own_folder" on storage.objects;
create policy "avatars_write_own_folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "avatars_update_own_folder" on storage.objects;
create policy "avatars_update_own_folder"
on storage.objects for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "avatars_delete_own_folder" on storage.objects;
create policy "avatars_delete_own_folder"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Listing images: anyone can read; listing owner can write under folder listing_id/*
-- Use UUID filenames to avoid overwriting existing images.
drop policy if exists "listing_images_read_public_bucket" on storage.objects;
create policy "listing_images_read_public_bucket"
on storage.objects for select
to public
using (bucket_id = 'listing-images');

-- For insert/update/delete we'll permit based on folder = listing_id AND listing owned by auth.uid()
-- storage.foldername(name)[1] gives the top folder segment.
drop policy if exists "listing_images_write_owner_folder" on storage.objects;
create policy "listing_images_write_owner_folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'listing-images'
  and exists (
    select 1 from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.user_id = auth.uid()
  )
);

drop policy if exists "listing_images_update_owner_folder" on storage.objects;
create policy "listing_images_update_owner_folder"
on storage.objects for update
to authenticated
using (
  bucket_id = 'listing-images'
  and exists (
    select 1 from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'listing-images'
  and exists (
    select 1 from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.user_id = auth.uid()
  )
);

drop policy if exists "listing_images_delete_owner_folder" on storage.objects;
create policy "listing_images_delete_owner_folder"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'listing-images'
  and exists (
    select 1 from public.listings l
    where l.id::text = (storage.foldername(name))[1]
      and l.user_id = auth.uid()
  )
);
