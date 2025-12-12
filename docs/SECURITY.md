# Security

## Reporting
If you discover a vulnerability, please email the maintainers and avoid filing public issues until a fix is coordinated. Do not include sensitive data in bug reports.

## Principles
- Supabase Row Level Security is enabled for all public tables and enforced in storage policies.
- Admin capabilities are executed server-side via API routes that verify `is_admin` and record audit events.
- Service role keys must remain server-only and are never bundled in client code.
- Uploads should use UUID filenames to prevent overwrites in public buckets.
