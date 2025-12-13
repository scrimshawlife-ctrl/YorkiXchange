# Replit Deployment Guide

Quick reference for deploying YorkiExchange to Replit.

---

## 🚀 One-Click Deploy

Click this button to deploy instantly:

[![Run on Replit](https://replit.com/badge/github/scrimshawlife-ctrl/YorkiXchange)](https://replit.com/new/github/scrimshawlife-ctrl/YorkiXchange)

---

## 📋 Environment Variables Needed

After importing, add these in the **Secrets** tab (🔒):

### Required Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://YOUR_REPL_NAME.YOUR_USERNAME.repl.co
NEXT_PUBLIC_APP_ENV=development
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Where to Get Values

**Supabase Dashboard** → https://app.supabase.com → Your Project → Settings → API

- `NEXT_PUBLIC_SUPABASE_URL` → **Project URL**
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **anon/public key**
- `SUPABASE_SERVICE_ROLE_KEY` → **service_role key** (mark as sensitive)

**Repl URL**:
- Will be shown after import (e.g., `https://yorkiexchange-username.repl.co`)
- Update `NEXT_PUBLIC_SITE_URL` with your actual Repl URL

---

## ⚡ Quick Start

1. **Click Deploy Button** → Imports from GitHub
2. **Add Secrets** → Paste environment variables
3. **Click Run** → Starts development server
4. **Open Webview** → View your app

---

## 📁 Configuration Files

The repository includes these Replit files:

| File | Purpose |
|------|---------|
| `.replit` | Main config (run commands, ports, language) |
| `replit.nix` | Environment dependencies (Node.js 20) |
| `.replitignore` | Files to exclude from Replit filesystem |

All pre-configured and ready to use! ✅

---

## 🔧 Available Commands

Run these in the **Shell** tab:

```bash
# Development (default)
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm start
```

---

## 🎯 Features

### Development

- ✅ **Hot reload** - Changes update instantly
- ✅ **Node.js 20** - Latest LTS version
- ✅ **TypeScript support** - Built-in LSP
- ✅ **Port forwarding** - Automatic HTTPS

### Collaboration

- ✅ **Multiplayer editing** - Invite team members
- ✅ **Live cursors** - See collaborators in real-time
- ✅ **GitHub sync** - Push/pull directly from Replit

### Deployment

- ✅ **Always-on option** - Keep Repl running (paid plans)
- ✅ **Custom domains** - Use your own domain (paid plans)
- ✅ **Zero-config** - Works out of the box

---

## 🐛 Troubleshooting

### Build fails

**Check**:
- All secrets are added correctly
- Secret names match exactly (case-sensitive)
- Supabase project is active

**Fix**: Restart Repl (Stop → Run)

### Port errors

**Fix**:
```bash
# In Shell
pkill node
# Then click Run
```

### Module not found

**Fix**:
```bash
npm ci
```

---

## 📚 Full Documentation

For detailed setup, database configuration, and advanced features:

👉 **[docs/DEPLOY_REPLIT.md](docs/DEPLOY_REPLIT.md)**

Includes:
- Database setup guide
- Performance optimization
- Deployment options (Render, Vercel)
- Security best practices
- Multiplayer editing
- Troubleshooting guide

---

## 🆚 Replit vs Other Platforms

| Feature | Replit | Render | Vercel |
|---------|--------|--------|--------|
| **Free tier** | ✅ 1GB RAM | ✅ Free | ✅ Free |
| **Setup time** | 🚀 1-click | 5 min | 5 min |
| **Hot reload** | ✅ Yes | ❌ No | ❌ No |
| **Multiplayer** | ✅ Yes | ❌ No | ❌ No |
| **Custom domain** | 💰 Paid | ✅ Free | ✅ Free |
| **Always-on** | 💰 Paid | ✅ Free | ✅ Free |
| **Best for** | Development | Production | Production |

**Recommendation**:
- 🎨 **Development**: Use Replit (fast iteration, collaboration)
- 🚀 **Production**: Use Render or Vercel (better performance, free domains)

---

## 🔐 Security

### Secrets

- ✅ Use Replit's **Secrets** tab (not `.env` files)
- ✅ Mark `SUPABASE_SERVICE_ROLE_KEY` as sensitive
- ❌ Never commit secrets to Git

### Public vs Private

- **Public Repls**: Source code visible, secrets hidden
- **Private Repls**: Everything hidden (Hacker/Pro plans)

---

## 💡 Pro Tips

1. **Speed up development**: Keep Repl "always on" (paid)
2. **Collaborate**: Share Repl link with team
3. **Test quickly**: Use Replit for prototypes, then deploy to Render
4. **Version control**: Push to GitHub directly from Replit

---

## 🎓 Next Steps

After deploying:

1. ✅ Set up Supabase database (run `/supabase-schema.sql`)
2. ✅ Test authentication flow
3. ✅ Create test listings
4. ✅ Review brand showcase at `/brand-showcase`
5. ✅ When ready, deploy to production (Render/Vercel)

---

**Quick Deploy**: Click the badge at the top! 🚀

**Version**: 2.0.0
**Updated**: December 12, 2025
