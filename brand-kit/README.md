# YorkiExchange Brand Kit v2.0

**Complete, production-ready brand assets for YorkiExchange**

Welcome to the official YorkiExchange brand kit. This package contains everything needed to build on-brand experiences: logos, color palettes, typography, UI components, voice guidelines, and more.

---

## 📦 What's Inside

```
brand-kit/
├── brand-guide/          # Complete brand guide (Markdown + PDF)
├── logos/                # SVG logos (crest, wordmark, mark)
├── icons/                # App icons + favicons (generation guide)
├── tokens/               # Design tokens (CSS, Tailwind, JSON)
├── ui-examples/          # UI component specifications
├── copy/                 # Voice guidelines + microcopy library
└── README.md             # This file
```

---

## 🎨 Quick Start

### 1. Brand Name (CRITICAL)

**Official spelling**: `YorkiExchange` (CamelCase: capital Y, capital E, no spaces)

❌ **NEVER use**: YorkiXchange, YorkieExchange, Yorki Exchange, yorkiexchange

### 2. Color Palette

```css
/* Primary */
--yorkie-blue: #1F6F9C;           /* Headers, links, primary brand */
--midnight-charcoal: #0E1A22;     /* Text, outlines, serious tone */

/* Secondary */
--warm-fur-tan: #D8B58A;          /* Warm accents, backgrounds */
--soft-cream: #F4EFE9;            /* Light backgrounds, cards */

/* Accent */
--collar-gold: #E2B23C;           /* CTAs, verification ONLY */
```

### 3. Typography

```css
/* Headlines */
font-family: 'Montserrat', 'Poppins', sans-serif;
font-weight: 600; /* SemiBold */

/* Body/UI */
font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
font-weight: 400; /* Regular */
```

### 4. Logo Usage

**Crest** (`logos/yorkiexchange-crest.svg`):
- Use for: Hero sections, about page, trust badges, merchandise
- Min size: 64px height

**Wordmark** (`logos/yorkiexchange-wordmark.svg`):
- Use for: Desktop nav, email headers, documentation
- Min size: 140px width

**Mark** (`logos/yorkiexchange-mark.svg`):
- Use for: Mobile nav, favicons, social avatars
- Min size: 24px

---

## 🚀 Implementation

### Import Design Tokens

**CSS Variables**:
```html
<link rel="stylesheet" href="brand-kit/tokens/tokens.css">
```

**Tailwind Config**:
```javascript
// tailwind.config.js
const yorkieTheme = require('./brand-kit/tokens/tailwind.config.js');

module.exports = {
  theme: {
    extend: {
      ...yorkieTheme.theme.extend
    }
  }
};
```

**Raw JSON**:
```javascript
import tokens from './brand-kit/tokens/design-tokens.json';
console.log(tokens.colors.primary.yorkieBlue); // "#1F6F9C"
```

### Use Pre-Built Components

**Button (Primary CTA)**:
```html
<button class="btn-yorkie-primary">Contact Seller</button>
```

**Card**:
```html
<div class="card-yorkie">
  <!-- Card content -->
</div>
```

**Input**:
```html
<input type="text" class="input-yorkie" placeholder="Search Yorkies...">
```

**Verified Badge**:
```html
<span class="badge-yorkie-verified">⭐ Verified</span>
```

---

## 📖 Documentation

### Core Documents

1. **[Brand Guide](brand-guide/BRAND-GUIDE.md)** — Complete brand guidelines (naming, colors, typography, logos, voice)
2. **[Design Tokens](tokens/design-tokens.json)** — Structured color, spacing, typography tokens
3. **[Voice Guidelines](copy/voice-guidelines.md)** — Tone, personality, writing patterns
4. **[Microcopy Library](copy/microcopy.json)** — Buttons, tooltips, error messages, empty states
5. **[UI Specs](ui-examples/UI-SPECS.md)** — Detailed component specifications (listing card, search grid, trust panel)
6. **[Icon Generation](icons/ICON-GENERATION.md)** — How to generate app icons and favicons

### Quick Reference

| Need | File |
|------|------|
| Official spelling | `brand-guide/BRAND-GUIDE.md` |
| Hex colors | `tokens/design-tokens.json` |
| CSS variables | `tokens/tokens.css` |
| Tailwind config | `tokens/tailwind.config.js` |
| Logo SVGs | `logos/*.svg` |
| Button text | `copy/microcopy.json` |
| Empty state messages | `copy/microcopy.json` |
| Component layouts | `ui-examples/UI-SPECS.md` |

---

## 🎯 Key Principles

### 1. Trust First
Every design decision reinforces safety and credibility:
- **Shield/crest** = safety boundary
- **Midnight Charcoal** = seriousness and authority
- **Yorkie Blue** = platform anchor and trust
- **Collar Gold** = verification (rare, intentional)

### 2. Clean Marketplace
High readability, scannable layouts, no visual clutter:
- Generous whitespace and consistent spacing
- Clear visual hierarchy (title → meta → actions)
- Rounded corners (8-12px) for approachability

### 3. Gold is Rare
Collar Gold (#E2B23C) appears ONLY for:
- Primary CTAs ("Contact Seller," "Post Listing")
- Verification badges ("Verified Breeder")
- Premium/trust indicators

Do NOT use gold for borders, backgrounds, or decoration.

### 4. Breathing Room
Maintain generous spacing:
- Logo clear space: 25% of logo height
- Card padding: 24px minimum
- Button padding: 12px vertical, 32px horizontal
- Section gaps: 48px+

### 5. Mobile-Ready
- Touch targets ≥44px
- Responsive typography (16px base minimum)
- Simplified layouts on mobile (1 column)
- Accessible contrast ratios (WCAG AA: 4.5:1)

---

## ✅ Brand Checklist

Before launching any design, verify:

- [ ] "YorkiExchange" spelling is correct (CamelCase)
- [ ] Colors match the palette exactly (no approximations)
- [ ] Fonts are Montserrat (headlines) or Inter (body)
- [ ] Logo has minimum clear space (25% height)
- [ ] Gold is used ONLY for CTAs/verification
- [ ] All text meets WCAG AA contrast standards (4.5:1)
- [ ] Touch targets are ≥44px on mobile
- [ ] Microcopy matches voice guidelines (friendly, clear, responsible)
- [ ] No baby talk, corporate jargon, or excessive cuteness

---

## 🎨 Design System Versions

### v2.0.0 (December 2025) — Current
- ✅ Official spelling: YorkiExchange (CamelCase)
- ✅ New color palette (Yorkie Blue, Midnight Charcoal, Warm Fur Tan, Soft Cream, Collar Gold)
- ✅ Complete logo system (crest, wordmark, mark)
- ✅ Production design tokens (CSS, Tailwind, JSON)
- ✅ UI component specifications
- ✅ Voice & microcopy guidelines
- ✅ Icon generation guide

### v1.0.0 (December 2025) — Deprecated
- ❌ Old spelling: YorkiXchange
- ❌ Old color palette (coral/tan)
- ⚠️ Do not use v1.0 assets

---

## 🛠️ For Developers

### Installing Fonts

**Google Fonts** (recommended):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

**Next.js** (optimized):
```javascript
import { Montserrat, Inter } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: '600' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });
```

### Icon/Favicon Setup

See `icons/ICON-GENERATION.md` for detailed instructions.

**Quick HTML**:
```html
<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg">
<link rel="icon" type="image/x-icon" href="/icons/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/app-icon-180.png">
<meta name="theme-color" content="#1F6F9C">
```

### Component Integration

All UI specs include React/Tailwind examples. See `ui-examples/UI-SPECS.md` for:
- Listing card component
- Search results grid
- Profile/trust panel

---

## 📋 File Manifest

| File | Purpose | Format |
|------|---------|--------|
| `brand-guide/BRAND-GUIDE.md` | Complete brand guide | Markdown |
| `logos/yorkiexchange-crest.svg` | Primary mark (3 Yorkies + shield) | SVG |
| `logos/yorkiexchange-wordmark.svg` | Horizontal lockup (crest + text) | SVG |
| `logos/yorkiexchange-mark.svg` | Icon only (simplified) | SVG |
| `tokens/design-tokens.json` | Structured design tokens | JSON |
| `tokens/tokens.css` | CSS custom properties | CSS |
| `tokens/tailwind.config.js` | Tailwind theme extension | JavaScript |
| `ui-examples/UI-SPECS.md` | Component specifications | Markdown |
| `icons/ICON-GENERATION.md` | Icon generation guide | Markdown |
| `copy/voice-guidelines.md` | Voice & tone rules | Markdown |
| `copy/microcopy.json` | UI text library | JSON |

---

## 🤝 Contributing

### Reporting Issues

If you find inconsistencies, typos, or missing assets:
1. Open an issue in the design repository
2. Tag with `brand-kit` label
3. Include screenshots and specific file references

### Requesting New Assets

For additional logo variants, components, or tokens:
1. Check existing assets first (`ui-examples/`, `logos/`)
2. Open a feature request with use case
3. Design team will review and prioritize

### Updates & Versioning

Brand kit follows semantic versioning:
- **Major** (3.0): Breaking changes to color palette, logo design, or naming
- **Minor** (2.1): New assets, components, or tokens (non-breaking)
- **Patch** (2.0.1): Fixes, typos, or clarifications

---

## 📞 Support

**Questions?**
- Email: brand@yorkiexchange.com
- Slack: #brand-design
- GitHub: [YorkiExchange/brand-kit](https://github.com/yorkiexchange/brand-kit)

**Emergency brand violations?**
- Report immediately to brand@yorkiexchange.com
- Include screenshots and URLs

---

## 📜 License

© 2025 YorkiExchange. All brand assets are proprietary and for internal use only. Do not redistribute, modify, or use outside of official YorkiExchange projects without written permission.

---

**Version**: 2.0.0
**Last Updated**: December 12, 2025
**Maintained by**: YorkiExchange Design Team
