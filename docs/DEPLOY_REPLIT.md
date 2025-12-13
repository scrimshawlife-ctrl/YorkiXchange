# Deploying to Replit

Deploy YorkiExchange to Replit for quick development and testing environments.

## Quick Deploy

Click this button to deploy directly to Replit:

[![Run on Replit](https://replit.com/badge/github/scrimshawlife-ctrl/YorkiXchange)](https://replit.com/new/github/scrimshawlife-ctrl/YorkiXchange)

## Manual Setup

### 1. Import to Replit

1. Go to [Replit](https://replit.com)
2. Click **Create Repl**
3. Select **Import from GitHub**
4. Enter repository URL: `https://github.com/scrimshawlife-ctrl/YorkiXchange`
5. Click **Import from GitHub**

### 2. Configure Environment Variables

In the Replit **Secrets** tab (🔒 icon in left sidebar), add these environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=https://YOUR_REPL_NAME.YOUR_USERNAME.repl.co
NEXT_PUBLIC_APP_ENV=development
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important Notes**:
- Get Supabase values from your [Supabase Dashboard](https://app.supabase.com) → Settings → API
- The `NEXT_PUBLIC_SITE_URL` will be your Repl's URL (e.g., `https://yorkiexchange.username.repl.co`)
- Mark `SUPABASE_SERVICE_ROLE_KEY` as sensitive

### 3. Install Dependencies

Replit will automatically detect `package.json` and install dependencies. If not, run:

```bash
npm ci
```

### 4. Run Development Server

Click the **Run** button at the top, or execute:

```bash
npm run dev
```

The app will be available at your Repl's URL (shown in the webview).

## Configuration Files

The repository includes Replit configuration files:

- **`.replit`** — Main configuration (run commands, language settings)
- **`replit.nix`** — Nix environment dependencies (Node.js 20, TypeScript)

These files are pre-configured and should work out of the box.

## Development Workflow

### File Editing

Edit files directly in the Replit editor. Changes will hot-reload automatically.

### Running Commands

Use the **Shell** tab to run commands:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Viewing Logs

Output appears in the **Console** tab. Check here for build errors or runtime issues.

## Database Setup

### 1. Create Supabase Project

If you don't have a Supabase project:

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for provisioning (~2 minutes)

### 2. Run Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy contents of `/supabase-schema.sql` from this repo
3. Paste and run the SQL
4. Verify tables were created in **Table Editor**

### 3. Configure Storage

1. Go to **Storage** in Supabase dashboard
2. Create two buckets:
   - `avatars` (public read, owner write)
   - `listing-images` (public read, owner write)
3. Set policies as defined in `supabase-schema.sql`

## Environment-Specific Settings

### Development (Replit)

```bash
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_SITE_URL=https://YOUR_REPL.repl.co
```

### Production (when deploying)

```bash
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
```

## Troubleshooting

### "Module not found" errors

**Solution**: Run `npm ci` to ensure all dependencies are installed.

### Port already in use

**Solution**:
1. Stop the current process (Ctrl+C in Shell)
2. Click **Run** button again

### Environment variables not loading

**Solution**:
1. Verify secrets are added in Secrets tab (🔒)
2. Restart the Repl (Stop → Run)
3. Check that secret names match exactly (case-sensitive)

### Build fails with Supabase errors

**Solution**:
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the **anon key**, not service role
3. Ensure Supabase project is active (not paused)

### Hot reload not working

**Solution**:
1. Hard refresh the webview (Ctrl+Shift+R or Cmd+Shift+R)
2. Restart the development server

## Performance Tips

### Speed Up Development

1. **Use .replitignore** — Already configured to exclude `node_modules`, `.next`
2. **Disable telemetry** — Already set via `NEXT_TELEMETRY_DISABLED=1`
3. **Clear cache** — Run `rm -rf .next` if builds are slow

### Optimize Repl

- Keep the Repl "always on" for faster load times (requires Replit Hacker plan)
- Use Replit's built-in database for simple data (not required for this app)

## Deployment from Replit

### Option 1: Deploy to Render from Replit

1. Push code from Replit to GitHub:
   ```bash
   git add .
   git commit -m "Update from Replit"
   git push origin main
   ```
2. Follow [DEPLOY_RENDER.md](./DEPLOY_RENDER.md) instructions

### Option 2: Deploy to Vercel

1. Install Vercel CLI in Replit Shell:
   ```bash
   npm i -g vercel
   ```
2. Deploy:
   ```bash
   vercel --prod
   ```
3. Add environment variables when prompted

### Option 3: Keep on Replit

Replit can host production apps with:
- Custom domains (Replit Hacker/Pro)
- Always-on deployments
- Automatic HTTPS

Configure in Replit dashboard → Deployments.

## Replit-Specific Features

### Multiplayer Editing

Invite collaborators to edit code together in real-time:
1. Click **Invite** button
2. Share the link with your team
3. Edit simultaneously with live cursors

### Database (Optional)

Replit Database is available for simple key-value storage:
```javascript
import Database from "@replit/database";
const db = new Database();
```

**Note**: YorkiExchange uses Supabase, so Replit Database is not required.

### GitHub Integration

Replit automatically syncs with GitHub:
- Pull changes: **Version Control** → Pull
- Push changes: **Version Control** → Push
- Create branches directly in Replit

## Security Notes

### Secrets Management

- ✅ **Always use Secrets tab** for environment variables
- ❌ **Never commit** `.env` or `.env.local` files
- ⚠️ **Service role key** should be marked as sensitive

### Public Repls

If your Repl is public:
- Secrets are still private (not visible to others)
- Source code is visible
- Consider making Repl private for proprietary projects

## Support

### Replit Issues

- [Replit Docs](https://docs.replit.com)
- [Replit Community](https://ask.replit.com)
- [Replit Status](https://status.replit.com)

### YorkiExchange Issues

- Review [README.md](../README.md)
- Check [ARCHITECTURE.md](./ARCHITECTURE.md)
- Open issue on GitHub

## Limits & Quotas

### Free Tier

- 1 GB RAM
- Repls pause after inactivity
- No custom domains
- Limited to public Repls

### Hacker/Pro Tier

- 4-8 GB RAM
- Always-on Repls
- Custom domains
- Private Repls
- Priority support

---

**Quick Start**: Click the Deploy to Replit button above and add your Supabase credentials in Secrets! 🚀

**Version**: 2.0.0
**Last Updated**: December 12, 2025
