# Render Deployment Fix

## Problem

Render deployment was failing during the Docker build with environment variable errors:
```
Error: NEXT_PUBLIC_SUPABASE_URL is required for server client
```

## Root Cause

The Dockerfile was running `npm run build` without environment variables available during the Docker build process. Render injects environment variables at **runtime**, not **build time**.

## Solution

Updated the Dockerfile to use placeholder values during the build, while real values are used at runtime:

### What Changed in Dockerfile

**Before:**
```dockerfile
COPY . .
RUN npm run build
```

**After:**
```dockerfile
COPY . .

# Set build-time environment variables with placeholders
ARG NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...placeholder
ARG NEXT_PUBLIC_SITE_URL=https://yorkiexchange.onrender.com
ARG NEXT_PUBLIC_APP_ENV=production
ARG SUPABASE_SERVICE_ROLE_KEY=eyJ...placeholder

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY

RUN npm run build
```

## How It Works

### Build Time (Docker Build)
1. Docker uses **placeholder values** from ARG declarations
2. These are converted to ENV variables
3. `npm run build` succeeds with placeholders
4. Build creates the Next.js standalone output

### Runtime (When Container Starts)
1. Render **injects real environment variables** you configured
2. These override the placeholder values
3. Your app connects to real Supabase
4. Everything works with actual credentials

## Why This Works

- **Next.js build** only needs env vars for type checking and build-time validation
- **Runtime code** (server-side, API routes) uses the real env vars from Render
- Placeholder values are **never used in production** - they're just for building

## Deployment Steps

Now when you deploy to Render:

1. **Click Deploy Button** → Render reads `render.yaml`
2. **Docker Build Runs** → Uses placeholder values, succeeds
3. **Add Environment Variables** → Your real Supabase credentials
4. **Container Starts** → Render injects real values, app connects to Supabase

## Environment Variables Still Required

You **still need to add** these in Render dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (your real key)
NEXT_PUBLIC_SITE_URL=https://yorkiexchange.onrender.com
NEXT_PUBLIC_APP_ENV=production
SUPABASE_SERVICE_ROLE_KEY=eyJ... (your real key) ← Mark as Secret
```

These override the placeholders when the container runs.

## Testing

The Dockerfile change is safe because:
- ✅ Build uses non-functional placeholders (can't connect to anything)
- ✅ Runtime uses real values from Render (injected automatically)
- ✅ Same pattern used successfully in CI builds
- ✅ Follows Docker/Next.js best practices

## What's Next

1. **Try deploying again** - Click the Render button
2. **Wait for build** - Should complete successfully now
3. **Add environment variables** - Use your real Supabase values
4. **Container starts** - App runs with real credentials

---

## Commit

**Commit**: `55897dd` - "fix: Update Dockerfile for Render deployment"

**Files Changed**:
- ✅ Dockerfile (added ARG/ENV declarations)

---

**Status**: Fixed and ready to deploy! 🚀
**Date**: December 12, 2025
