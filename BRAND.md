# YorkiXchange Brand Kit

Official brand guidelines and asset usage for YorkiXchange.

## Brand Name & Typesetting

**CRITICAL: Always use correct spelling and capitalization**

- ✅ **Correct**: `YorkiXchange` (capital Y, capital X, no spaces)
- ❌ **Incorrect**: `Yorkixchange`, `YorkiChange`, `Yorki Xchange`, `YORKiXCHANGE`
- **Tagline**: `Marketplace` (capital M, spelled correctly)
- ❌ **Never**: `MARETPLASE`, `Market Place`, `market-place`

## Color Palette

### Primary Colors (yorkix namespace)

```css
--yorkix-charcoal: #1F2328    /* Text, outlines, borders */
--yorkix-cream: #F6E9D8        /* Backgrounds, highlights */
--yorkix-tan: #C4A574          /* Yorkie fur primary */
--yorkix-tan-dark: #8B6F47     /* Yorkie fur shadows */
--yorkix-coral: #FF6B6B        /* Primary accent, badge bg */
--yorkix-coral-light: #FF8B7E  /* Lighter coral variant */
--yorkix-gray: #5F6770         /* Secondary borders */
```

### Usage Rules

- **Charcoal**: Body text, icon strokes, borders (high contrast)
- **Cream**: Light backgrounds, card backgrounds, highlights
- **Tan**: Mascot fur, warm accents, secondary CTA
- **Coral**: Primary CTA, active states, mascot background
- **Gray**: Disabled states, secondary borders, subtle dividers

## Logo Variants

### 1. Badge (Primary Mark)
- **File**: `/assets/brand/yorkixchange-badge.svg`
- **Usage**: Hero sections, about page, stickers, merchandise
- **Min Size**: 48px diameter
- **Background**: Works on white, cream, or light backgrounds

### 2. Wordmark (Horizontal Lockup)
- **File**: `/assets/brand/yorkixchange-wordmark.svg`
- **Usage**: Desktop nav, email headers, docs
- **Min Size**: 120px width
- **Background**: Transparent; works on light or dark

### 3. Mark (Icon Only)
- **File**: `/assets/brand/yorkixchange-mark.svg`
- **Usage**: Mobile nav, favicons, small icons
- **Min Size**: 24px
- **Background**: Transparent; optimized for small sizes

### 4. Favicon
- **File**: `/assets/brand/favicon.svg`
- **Usage**: Browser tabs, PWA icons, bookmarks
- **Size**: Optimized for 16px, 32px, 48px rendering

## Component Usage

### BrandLogo Component

```tsx
import { BrandLogo } from "@/components/brand/BrandLogo";

// Badge variant (large hero)
<BrandLogo variant="badge" size={96} />

// Wordmark (navigation)
<BrandLogo variant="wordmark" size={32} />

// Mark only (mobile nav)
<BrandLogo variant="mark" size={24} />
```

### MascotBubble Component

```tsx
import { MascotBubble } from "@/components/brand/MascotBubble";

// Empty state with tooltip
<MascotBubble
  message="No listings yet! Be the first to post."
  size={48}
/>
```

### EmptyState Component

```tsx
import { EmptyState } from "@/components/brand/EmptyState";

// Full empty state with CTA
<EmptyState
  title="No messages yet"
  description="Start a conversation by messaging a seller from a listing."
  actionLabel="Browse Listings"
  actionHref="/market"
/>
```

## Design Principles

1. **Friendly Premium**: Approachable but high-quality; cute without being childish
2. **Bold Outlines**: 2-3px stroke weight; ensures visibility at all sizes
3. **Soft Shading**: Subtle gradients on mascot; avoid harsh shadows
4. **Consistent Spacing**: Maintain breathing room around mascot and text
5. **Accessible Contrast**: All text meets WCAG AA standards (4.5:1 minimum)

## Typography

- **App UI**: Inter (via next/font/google)
- **Wordmark Style**: Rounded sans-serif aesthetic (converted to paths in SVG)
- **Weight**: Bold (700) for brand name, Medium (500) for tagline

## Accessibility

- All SVG assets include `<title>` elements
- Components accept `title` and `aria-label` props
- Mascot decorative elements use `aria-hidden="true"`
- Ensure 4.5:1 contrast ratio for all text on backgrounds

## File Sizes & Performance

- Badge SVG: ~8KB (gzipped: ~3KB)
- Wordmark SVG: ~6KB (gzipped: ~2KB)
- Mark SVG: ~4KB (gzipped: ~1.5KB)
- Favicon SVG: ~2KB (gzipped: ~800B)

## Don'ts

❌ Don't stretch or skew the logo
❌ Don't change the yorkie's facial expression
❌ Don't use low-contrast color combinations
❌ Don't place logo on busy photographic backgrounds
❌ Don't use pixelated/raster versions below 2x resolution
❌ Don't misspell "YorkiXchange" or "Marketplace"
❌ Don't remove the decorative X marks from the badge

## Version History

- **v1.0** (2025-12-12): Initial brand kit with badge, wordmark, mark, and favicon
