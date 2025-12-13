# Post-Rebrand Deployment Checklist

Use this checklist to ensure a smooth deployment of the YorkiExchange v2.0 rebrand.

## Pre-Deployment

### Code Verification
- [ ] Run migration script: `./scripts/migrate-brand.sh`
- [ ] Verify TypeScript: `npm run typecheck`
- [ ] Verify ESLint: `npm run lint`
- [ ] Test local build: `npm run build` (with env vars)
- [ ] Test local preview: `npm start`

### Brand Asset Verification
- [ ] All new logos exist in `/public/assets/brand/`
- [ ] Favicon updated and working
- [ ] All component file paths reference new assets
- [ ] No broken image references

### Documentation Review
- [ ] Read `/brand-kit/README.md`
- [ ] Review `/brand-kit/HANDOFF.md`
- [ ] Understand color usage (Gold = CTAs only!)
- [ ] Review voice guidelines for content updates

## Deployment Steps

### 1. Merge & Deploy
- [ ] Merge PR to main/master
- [ ] Trigger deployment to staging
- [ ] Verify staging deployment successful
- [ ] Test all pages load correctly
- [ ] Verify brand assets load (check browser console)

### 2. Visual Verification
- [ ] Visit `/brand-showcase` route (if created)
- [ ] Check homepage for new spelling
- [ ] Verify logo appears in navigation
- [ ] Check favicon in browser tab
- [ ] Test on mobile viewport

### 3. Environment Configuration
- [ ] Staging env vars configured correctly
- [ ] Production env vars ready
- [ ] Supabase credentials valid
- [ ] Site URL matches deployment

### 4. Deploy to Production
- [ ] Deploy to production environment
- [ ] Monitor deployment logs
- [ ] Verify successful deployment
- [ ] Test critical user flows
- [ ] Check analytics/monitoring

## Post-Deployment

### Immediate (Day 1)
- [ ] Clear CDN cache (if applicable)
- [ ] Test on multiple devices (desktop, mobile, tablet)
- [ ] Verify all images load
- [ ] Check social share previews
- [ ] Monitor error logs

### Short-term (Week 1)
- [ ] Generate app icons using `/brand-kit/icons/ICON-GENERATION.md`
- [ ] Update PWA manifest with new icons
- [ ] Import design tokens to CSS/Tailwind
- [ ] Update meta tags with new branding
- [ ] Test email templates (if any use brand assets)

### Medium-term (Week 2-4)
- [ ] Update social media profiles (Twitter, LinkedIn, etc.)
- [ ] Update logo on external platforms (GitHub, ProductHunt, etc.)
- [ ] Update marketing materials
- [ ] Review and update documentation screenshots
- [ ] Consider removing old `yorkixchange-*` assets

### Content Updates
- [ ] Review all user-facing text for spelling consistency
- [ ] Apply voice guidelines to existing content
- [ ] Update FAQ/help docs with new brand name
- [ ] Update terms of service / privacy policy (if brand name mentioned)

## Design System Integration

### CSS/Tailwind Setup
- [ ] Add `/brand-kit/tokens/tokens.css` to `app/globals.css`
- [ ] OR merge `/brand-kit/tokens/tailwind.config.js` into Tailwind config
- [ ] Test new utility classes work
- [ ] Update existing components to use new tokens

### Component Migration
- [ ] Review existing components for color usage
- [ ] Replace hard-coded colors with design tokens
- [ ] Update button styles to match brand guide
- [ ] Update card styles to match brand guide
- [ ] Add new brand components where needed

## External Platform Updates

### Required Updates
- [ ] GitHub repository name/description
- [ ] GitHub social preview image
- [ ] Google Search Console (if applicable)
- [ ] Domain registrar metadata
- [ ] Email service provider (logo in emails)

### Marketing Platforms
- [ ] Twitter/X profile & banner
- [ ] LinkedIn company page
- [ ] Facebook page
- [ ] Instagram profile
- [ ] ProductHunt listing
- [ ] Other directories/listings

### Development Platforms
- [ ] Render.com service name/description
- [ ] Azure container app name
- [ ] Vercel/Netlify project settings
- [ ] Docker Hub repository (if applicable)
- [ ] npm package (if applicable)

## Performance Monitoring

### Metrics to Watch
- [ ] Page load times (before vs after)
- [ ] Image load performance
- [ ] Lighthouse scores
- [ ] Core Web Vitals
- [ ] Error rates

### Analytics
- [ ] Google Analytics tracking working
- [ ] User behavior unchanged
- [ ] No increase in bounce rate
- [ ] Monitor for broken links

## Rollback Plan

### If Issues Arise
- [ ] Document rollback procedure
- [ ] Keep old assets available temporarily
- [ ] Have previous build ready to redeploy
- [ ] Communication plan for users

### Known Compatibility
- [ ] Old `yorkixchange-*` assets kept for backwards compatibility
- [ ] Can remove after 48-72 hours (cache expiry)
- [ ] External links may still use old URLs

## Team Communication

### Internal
- [ ] Notify team of rebrand completion
- [ ] Share brand guidelines document
- [ ] Train team on new spelling (YorkiExchange)
- [ ] Update internal documentation

### External
- [ ] Announce rebrand to users (if appropriate)
- [ ] Update changelog/release notes
- [ ] Send email to existing users (optional)
- [ ] Social media announcement

## Quality Assurance

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Device Testing
- [ ] Desktop (1920×1080)
- [ ] Laptop (1366×768)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone 13/14)
- [ ] Mobile (Pixel/Samsung)

### Accessibility
- [ ] Screen reader test (logo alt text)
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] No color-only information

## Documentation

### Update These Docs
- [ ] README.md (already done ✓)
- [ ] CONTRIBUTING.md (if exists)
- [ ] API documentation (if exists)
- [ ] User guides
- [ ] Developer onboarding

### Create New Docs
- [ ] Brand usage guidelines (internal)
- [ ] Asset request process
- [ ] Content style guide
- [ ] Design review process

## Long-term

### Quarterly Review (Q1 2026)
- [ ] Review brand consistency across platform
- [ ] Gather user feedback on rebrand
- [ ] Measure brand recognition
- [ ] Consider refinements

### Annual Review (2026)
- [ ] Full brand audit
- [ ] Update brand kit if needed
- [ ] Refresh assets if necessary
- [ ] Plan for v3.0 (if needed)

---

## Sign-Off

**Deployment Lead**: _________________
**Date**: _________________
**Environment**: [ ] Staging [ ] Production
**Status**: [ ] Complete [ ] Issues Found

**Notes**:
_____________________________________________
_____________________________________________
_____________________________________________

---

## Quick Reference

**Brand Name**: YorkiExchange (CamelCase)
**Primary Color**: Yorkie Blue (#1F6F9C)
**Accent Color**: Collar Gold (#E2B23C) — CTAs ONLY
**Support Email**: brand@yorkiexchange.com

**Key Documents**:
- Quick Start: `/brand-kit/README.md`
- Brand Guide: `/brand-kit/brand-guide/BRAND-GUIDE.md`
- Handoff: `/brand-kit/HANDOFF.md`
- Test Results: `/brand-kit/TEST-RESULTS.md`

---

**Version**: 2.0.0
**Last Updated**: December 12, 2025
