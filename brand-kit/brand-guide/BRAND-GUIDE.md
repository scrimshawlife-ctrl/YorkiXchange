# YorkiExchange Brand Guide

**Version 2.0** | December 2025
Official brand guidelines and asset usage for YorkiExchange

---

## Brand Overview

**YorkiExchange** is a community marketplace platform — "Craigslist for Yorkie people."
Our brand conveys trust, community, and responsible breeding/rehoming through clear visual anchors:

- **Shield/Crest** = Safety boundary and platform authority
- **Three Yorkies** = Community (center authority + side peers)
- **Clean Typography** = Professionalism without corporate coldness
- **Strategic Gold** = Verification and trust markers

---

## 1. Brand Name & Spelling

### CRITICAL: Official Spelling

✅ **CORRECT**: `YorkiExchange` (CamelCase: capital Y, capital E, no spaces)

❌ **INCORRECT**:
- YorkiXchange (old spelling)
- YorkieExchange
- Yorki Exchange
- yorki-exchange
- YORKIEXCHANGE

### Usage Rules

- Always use CamelCase in text, code, and UI
- Domain/URLs may use lowercase: `yorkiexchange.com`
- Social handles: `@yorkiexchange` or `@YorkiExchange`
- Hashtags: `#YorkiExchange`

---

## 2. Color Palette

### Primary Colors

```css
/* Platform Core */
--yorkie-blue: #1F6F9C;         /* Primary brand color, headers, links */
--midnight-charcoal: #0E1A22;   /* Body text, serious tone, borders */

/* Warmth & Comfort */
--warm-fur-tan: #D8B58A;        /* Secondary accents, backgrounds */
--soft-cream: #F4EFE9;          /* Light backgrounds, cards, highlights */

/* Accent */
--collar-gold: #E2B23C;         /* CTAs, verification badges ONLY */
```

### Color Usage Guidelines

| Color | Usage | Don't Use For |
|-------|-------|---------------|
| **Yorkie Blue** | Headers, primary buttons, active nav, links | Backgrounds, body text |
| **Midnight Charcoal** | Body text, icons, borders, outlines | Accent elements |
| **Warm Fur Tan** | Secondary buttons, card accents, section backgrounds | Primary CTAs |
| **Soft Cream** | Page backgrounds, card fills, input fields | Text |
| **Collar Gold** | "Verify Breeder", "Contact Seller", Premium badges | General decoration, borders |

### Color Hierarchy

1. **Charcoal** dominates (text, structure)
2. **Blue** guides (navigation, links)
3. **Tan/Cream** comforts (backgrounds, warmth)
4. **Gold** emphasizes (rare, intentional)

### Accessibility

- All text colors meet WCAG AA standards (4.5:1 minimum)
- Blue on Cream: 4.8:1 ✅
- Charcoal on Cream: 13.2:1 ✅
- Gold on Blue: 3.2:1 ⚠️ (use for large text/buttons only)

---

## 3. Typography

### Font Families

```css
/* Headlines & Display */
--font-headline: 'Montserrat', 'Poppins', 'Helvetica Neue', sans-serif;
font-weight: 600; /* SemiBold */

/* Body & UI */
--font-body: 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif;
font-weight: 400; /* Regular */
font-weight: 500; /* Medium for emphasis */

/* Monospace (code, IDs) */
--font-mono: 'SF Mono', 'Consolas', 'Monaco', monospace;
```

### Type Scale

```css
--text-xs: 0.75rem;    /* 12px - captions, metadata */
--text-sm: 0.875rem;   /* 14px - secondary text */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - large body */
--text-xl: 1.25rem;    /* 20px - subheadings */
--text-2xl: 1.5rem;    /* 24px - section titles */
--text-3xl: 1.875rem;  /* 30px - page titles */
--text-4xl: 2.25rem;   /* 36px - hero headlines */
```

### Usage Examples

- **Hero Title**: Montserrat SemiBold 36px, Charcoal
- **Card Title**: Inter Medium 20px, Charcoal
- **Body Text**: Inter Regular 16px, Charcoal
- **Button**: Inter Medium 14px, uppercase tracking
- **Caption**: Inter Regular 12px, 60% opacity

---

## 4. Logo System

### 4.1 Crest (Primary Mark)

**File**: `logos/yorkiexchange-crest.svg`

- **Design**: Shield with three Yorkies (centered authority, side peers)
- **Min Size**: 64px height
- **Usage**: Hero sections, about page, trust badges, merchandise
- **Background**: Transparent; works on Soft Cream or white

**Clear Space**: Minimum padding = 25% of logo height on all sides

### 4.2 Wordmark (Horizontal Lockup)

**File**: `logos/yorkiexchange-wordmark.svg`

- **Design**: Crest + "YorkiExchange" text lockup
- **Min Size**: 140px width
- **Usage**: Desktop navigation, email headers, documentation
- **Background**: Transparent; optimized for light backgrounds

**Clear Space**: Minimum padding = 20% of logo width left/right

### 4.3 Mark (Icon Only)

**File**: `logos/yorkiexchange-mark.svg`

- **Design**: Simplified crest icon
- **Min Size**: 24px
- **Usage**: Mobile nav, favicons, social avatars
- **Background**: Transparent

### Logo Do's and Don'ts

✅ **DO**:
- Use on Soft Cream, white, or light tan backgrounds
- Maintain aspect ratio when scaling
- Ensure minimum clear space
- Use SVG format for web/apps

❌ **DON'T**:
- Add drop shadows, glows, or effects
- Stretch, skew, or rotate
- Place on busy photographic backgrounds
- Add decorative elements (pawprints, bones, hearts)
- Change Yorkie facial expressions
- Use low-resolution raster versions

---

## 5. Icon & Favicon System

### App Icon (1024×1024)

**File**: `icons/app-icon-1024.png`

- **Background**: Yorkie Blue (#1F6F9C)
- **Foreground**: Crest centered, white/cream tones
- **Border**: 2px Midnight Charcoal inset
- **Export Sizes**: 1024, 512, 256, 128, 64, 32, 16 (PNG)

### Favicon

**File**: `icons/favicon.ico`

- **Format**: Multi-resolution ICO (32×32, 16×16)
- **Design**: Simplified crest mark
- **Fallback**: SVG favicon for modern browsers

### PWA Icons

Provide `manifest.json` entries:
```json
{
  "icons": [
    { "src": "/icons/app-icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/app-icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 6. UI Design Tokens

### Spacing Scale

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### Border Radius

```css
--radius-sm: 0.25rem;  /* 4px - small elements */
--radius-md: 0.5rem;   /* 8px - cards, buttons */
--radius-lg: 0.75rem;  /* 12px - modals, large cards */
--radius-xl: 1rem;     /* 16px - hero sections */
--radius-full: 9999px; /* pills, avatars */
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(14, 26, 34, 0.08);
--shadow-md: 0 4px 8px rgba(14, 26, 34, 0.12);
--shadow-lg: 0 8px 16px rgba(14, 26, 34, 0.16);
--shadow-xl: 0 12px 24px rgba(14, 26, 34, 0.20);
```

### Component Primitives

**Button**:
```css
padding: 0.75rem 1.5rem;
border-radius: var(--radius-md);
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.05em;
```

**Card**:
```css
background: var(--soft-cream);
border: 1px solid rgba(14, 26, 34, 0.12);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-sm);
```

**Input**:
```css
background: white;
border: 2px solid rgba(14, 26, 34, 0.16);
border-radius: var(--radius-md);
padding: 0.75rem 1rem;
```

---

## 7. UI Component Examples

### 7.1 Listing Card

**Visual Hierarchy**:
1. Thumbnail image (16:9 ratio, rounded corners)
2. Title (Inter Medium 18px, Charcoal)
3. Location + Price (Inter Regular 14px, 70% opacity)
4. Verified badge (Collar Gold, 16px icon + label)

**Layout**:
- Card background: Soft Cream
- Border: 1px Charcoal 12% opacity
- Padding: 16px
- Border radius: 12px
- Shadow: sm

### 7.2 Search Results Grid

**Grid**:
- Desktop: 3 columns, 24px gap
- Tablet: 2 columns, 16px gap
- Mobile: 1 column, 12px gap

**Filters**:
- Sidebar width: 280px
- Filter chips: Warm Fur Tan background, Charcoal text
- Active filter: Yorkie Blue background, white text

### 7.3 Profile/Trust Panel

**Trust Indicators**:
- Verified badge: Collar Gold star icon + "Verified Breeder"
- Rating: 5-star display, Yorkie Blue filled stars
- Member since: Inter Regular 14px, 60% opacity
- Response rate: Percentage + time indicator

**Layout**:
- Avatar: 96px circle, Yorkie Blue border
- Name: Montserrat SemiBold 24px
- Bio: Inter Regular 16px, max 3 lines
- CTA: "Contact Seller" button, Collar Gold

---

## 8. Voice & Tone

### Brand Personality

- **Friendly**: Approachable without being childish
- **Clear**: Direct communication, no jargon
- **Community-First**: "We" language, peer-to-peer trust
- **Responsible**: Serious about breeding ethics and pet welfare

### Voice Guidelines

✅ **DO**:
- Use active voice ("Find your perfect Yorkie")
- Be conversational but professional
- Show empathy for pet owners
- Emphasize community and trust

❌ **DON'T**:
- Use baby talk or excessive cuteness
- Deploy corporate jargon or buzzwords
- Make unrealistic promises
- Trivialize breeding/rehoming decisions

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| **Welcome** | Warm, inviting | "Welcome to YorkiExchange — where Yorkie lovers connect." |
| **Search/Browse** | Helpful, clear | "Filter by location, age, and breeder verification." |
| **Listing** | Factual, trustworthy | "Verified breeder • Member since 2024 • 98% response rate" |
| **Contact** | Encouraging | "Contact the seller to learn more about this Yorkie." |
| **Error** | Apologetic, constructive | "We couldn't find that listing. Try browsing recent posts." |
| **Moderation** | Firm, fair | "This listing was removed for violating community guidelines." |

---

## 9. Microcopy Library

### Buttons & CTAs

1. **Contact** — primary action on listings
2. **Browse Listings** — homepage CTA
3. **Post a Listing** — seller CTA
4. **Verify Breeder** — trust action
5. **Report Listing** — moderation action
6. **Save Search** — personalization
7. **Message Seller** — direct contact
8. **View Profile** — user action
9. **Edit Listing** — seller management
10. **Rehome Responsibly** — educational CTA

### Tooltips & Help Text

11. **"Verified breeders have confirmed their identity and credentials."** — verification tooltip
12. **"Response rate: Average time this seller replies to messages."** — trust metric

### Empty States

13. **"No listings yet! Be the first to post."** — empty search
14. **"Start a conversation by messaging a seller."** — empty inbox
15. **"Save your favorite listings to see them here."** — empty saved

---

## 10. Design Principles

1. **Trust First**: Every design decision reinforces safety and credibility
2. **Clean Marketplace**: High readability, scannable layouts, no visual clutter
3. **Gold is Rare**: Collar Gold appears ONLY for CTAs and verification
4. **Breathing Room**: Generous whitespace, consistent spacing
5. **Mobile-Ready**: Touch targets ≥44px, readable at small sizes

---

## 11. File Specifications

### Vector Assets (SVG)

- **Viewbox**: Relative units (e.g., `viewBox="0 0 100 100"`)
- **Stroke Width**: 2-3px for logo outlines
- **Optimization**: Run through SVGO, remove metadata
- **Titles**: Include `<title>` for accessibility

### Raster Assets (PNG)

- **Resolution**: 2x minimum for retina displays
- **Compression**: Use PNG-8 for icons, PNG-24 for photos
- **Transparency**: Preserve alpha channel
- **Naming**: `yorkiexchange-[type]-[size].png`

### Performance Targets

- Logo SVG: <10KB gzipped
- App icon PNG: <50KB per size
- Favicon ICO: <10KB

---

## 12. Package Structure

```
brand-kit/
├── brand-guide/
│   ├── BRAND-GUIDE.md (this file)
│   └── BRAND-GUIDE.pdf (export from Markdown)
├── logos/
│   ├── yorkiexchange-crest.svg
│   ├── yorkiexchange-crest.png (2x)
│   ├── yorkiexchange-wordmark.svg
│   ├── yorkiexchange-wordmark.png (2x)
│   └── yorkiexchange-mark.svg
├── icons/
│   ├── app-icon-1024.png
│   ├── app-icon-512.png
│   ├── app-icon-256.png
│   ├── app-icon-128.png
│   ├── app-icon-64.png
│   ├── app-icon-32.png
│   ├── app-icon-16.png
│   └── favicon.ico
├── tokens/
│   ├── design-tokens.json
│   ├── tokens.css
│   └── tailwind.config.js
├── ui-examples/
│   ├── listing-card.png
│   ├── search-results.png
│   └── trust-panel.png
├── copy/
│   ├── voice-guidelines.md
│   └── microcopy.json
└── README.md
```

---

## Version History

- **v2.0** (2025-12-12): Complete rebrand with YorkiExchange spelling, new color palette (Yorkie Blue, Midnight Charcoal, Warm Fur Tan, Soft Cream, Collar Gold), production-ready asset pack
- **v1.0** (2025-12-12): Initial brand kit (YorkiXchange, coral/tan palette)

---

**Questions?** Email brand@yorkiexchange.com or open an issue in the design repository.
