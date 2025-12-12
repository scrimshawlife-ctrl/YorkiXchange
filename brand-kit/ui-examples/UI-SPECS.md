# YorkiExchange UI Component Specifications

This document provides detailed specifications for the three core UI components in the YorkiExchange design system. Use these specs to build production-ready components.

---

## 1. Listing Card

**Purpose**: Display Yorkie listings in grid/list views with key information at a glance.

### Visual Hierarchy

1. **Thumbnail Image** (top)
2. **Title** (bold, prominent)
3. **Location + Price** (secondary info)
4. **Verified Badge** (trust indicator)

### Layout Specifications

```
┌─────────────────────────────────┐
│                                 │
│        [Image 16:9]             │
│                                 │
├─────────────────────────────────┤
│                                 │
│  ● Adorable 8-week Yorkie       │ ← Title (18px, Medium)
│                                 │
│  📍 Austin, TX      💰 $1,500   │ ← Meta (14px, Regular)
│                                 │
│  ⭐ Verified Breeder            │ ← Badge (12px, Gold)
│                                 │
└─────────────────────────────────┘
```

### Detailed Specs

**Container**:
- Background: `var(--soft-cream)` (#F4EFE9)
- Border: 1px solid rgba(14, 26, 34, 0.12)
- Border radius: 12px (`var(--radius-lg)`)
- Padding: 16px (`var(--space-4)`)
- Shadow: `var(--shadow-sm)`
- Hover: `var(--shadow-md)` + translateY(-2px)
- Max width: 360px
- Transition: all 200ms ease

**Image**:
- Aspect ratio: 16:9
- Border radius: 8px (top only or all if standalone)
- Object-fit: cover
- Background (loading): `var(--warm-fur-tan)`
- Margin bottom: 12px

**Title**:
- Font: `var(--font-body)` (Inter)
- Size: 18px (`var(--text-lg)`)
- Weight: 500 (Medium)
- Color: `var(--midnight-charcoal)` (#0E1A22)
- Line height: 1.4
- Max lines: 2 (text-overflow: ellipsis)
- Margin bottom: 8px

**Meta Row** (Location + Price):
- Display: flex
- Justify: space-between
- Align: center
- Font size: 14px (`var(--text-sm)`)
- Color: rgba(14, 26, 34, 0.7)
- Margin bottom: 12px

**Location**:
- Icon: 📍 (or location pin SVG, 14px)
- Gap: 4px between icon and text
- Color: `var(--gray-600)`

**Price**:
- Font weight: 600 (SemiBold)
- Color: `var(--midnight-charcoal)`
- Prefix: "$"

**Verified Badge**:
- Display: inline-flex
- Align: center
- Gap: 4px
- Padding: 4px 12px
- Border radius: 9999px (`var(--radius-full)`)
- Background: `var(--collar-gold)` (#E2B23C)
- Color: `var(--midnight-charcoal)`
- Font size: 12px (`var(--text-xs)`)
- Font weight: 500 (Medium)
- Text transform: uppercase
- Letter spacing: 0.5px
- Icon: ⭐ or checkmark SVG (12px)

### States

**Default**: Soft shadow, cream background
**Hover**: Medium shadow, subtle lift
**Active/Pressed**: Inner shadow, no lift
**Disabled**: 50% opacity, no hover effects

### Responsive Behavior

- **Desktop (>1024px)**: 360px max-width, grid 3 columns
- **Tablet (768px-1023px)**: Flexible width, grid 2 columns
- **Mobile (<768px)**: Full width minus margins, grid 1 column

---

## 2. Search Results Grid

**Purpose**: Display multiple listing cards in a responsive, scannable grid layout with filters.

### Layout Specifications

```
┌──────────────────────────────────────────────────────────────┐
│  [Filters Sidebar]     [Listing Cards Grid]                  │
│                                                               │
│  Location              ┌─────┐ ┌─────┐ ┌─────┐              │
│  □ 50 miles            │Card │ │Card │ │Card │              │
│  □ 100 miles           │  1  │ │  2  │ │  3  │              │
│                        └─────┘ └─────┘ └─────┘              │
│  Price Range                                                 │
│  [slider: $0-$3000]    ┌─────┐ ┌─────┐ ┌─────┐              │
│                        │Card │ │Card │ │Card │              │
│  Age                   │  4  │ │  5  │ │  6  │              │
│  □ Puppies (0-1yr)     └─────┘ └─────┘ └─────┘              │
│  □ Adults (1-7yrs)                                           │
│                        [Load More]                           │
│  Verified Only                                               │
│  ☑ Verified Breeders                                         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Container Specs

**Grid Container**:
- Display: grid
- Gap: 24px (desktop), 16px (tablet), 12px (mobile)
- Columns: 3 (desktop), 2 (tablet), 1 (mobile)
- Padding: 24px
- Background: white or very light gray

**Sidebar** (Desktop/Tablet):
- Width: 280px (fixed)
- Position: sticky (top: 24px)
- Background: `var(--soft-cream)`
- Border radius: 12px
- Padding: 24px
- Shadow: `var(--shadow-sm)`
- Height: fit-content
- Max-height: calc(100vh - 48px)
- Overflow-y: auto

**Sidebar** (Mobile):
- Position: fixed bottom drawer or collapsible accordion
- Full width
- Border radius: 16px 16px 0 0
- Z-index: 100

### Filter Components

**Section Header**:
- Font: `var(--font-headline)`
- Size: 14px
- Weight: 600 (SemiBold)
- Color: `var(--midnight-charcoal)`
- Text transform: uppercase
- Letter spacing: 1px
- Margin bottom: 12px

**Checkbox Group**:
- Gap: 8px between items
- Checkbox size: 18px
- Label font size: 14px
- Label color: `var(--midnight-charcoal)`
- Hover: background highlight

**Slider (Price Range)**:
- Track height: 4px
- Track background: `var(--gray-300)`
- Active track: `var(--yorkie-blue)`
- Thumb size: 18px
- Thumb color: `var(--yorkie-blue)`
- Thumb border: 2px white
- Labels: min/max values below slider

**Active Filter Chips**:
- Display: inline-flex above grid
- Background: `var(--warm-fur-tan)`
- Color: `var(--midnight-charcoal)`
- Padding: 6px 12px
- Border radius: 20px
- Font size: 13px
- Close icon: X (12px)
- Margin: 4px

**Apply/Clear Buttons**:
- Apply: `btn-yorkie-primary` (Collar Gold)
- Clear: `btn-yorkie-secondary` (Warm Fur Tan)
- Width: 100%
- Margin top: 16px

### Results Header

**Above Grid**:
- Display: flex
- Justify: space-between
- Align: center
- Margin bottom: 16px

**Results Count**:
- Font size: 16px
- Color: `var(--gray-600)`
- Example: "48 Yorkies available"

**Sort Dropdown**:
- Background: white
- Border: 1px solid rgba(14, 26, 34, 0.16)
- Border radius: 8px
- Padding: 8px 12px
- Font size: 14px
- Options: Newest, Price (Low-High), Price (High-Low), Distance

### Responsive Breakpoints

- **Desktop (≥1024px)**: Sidebar + 3 columns
- **Tablet (768px-1023px)**: Sidebar + 2 columns
- **Mobile (<768px)**: Bottom drawer + 1 column

---

## 3. Profile/Trust Panel

**Purpose**: Display user profile and trust indicators for breeders/sellers.

### Visual Hierarchy

1. **Avatar** (large, centered)
2. **Name + Verification Badge**
3. **Trust Metrics** (rating, response rate, member since)
4. **Bio/Description**
5. **CTA Button** (Contact Seller)

### Layout Specifications

```
┌─────────────────────────────────────┐
│                                     │
│         ╔═══════════╗               │
│         ║  Avatar   ║               │ ← 96px circle
│         ║   Image   ║               │
│         ╚═══════════╝               │
│                                     │
│    Sarah Johnson  ⭐ Verified       │ ← Name + badge
│                                     │
│    ★★★★★ 4.9 (47 reviews)          │ ← Rating
│                                     │
│  ┌─────────────┬─────────────────┐ │
│  │ Member      │ Response Rate   │ │ ← Trust metrics
│  │ since 2022  │ 98% (2hr avg)   │ │
│  └─────────────┴─────────────────┘ │
│                                     │
│  "Ethical AKC breeder with 10+     │ ← Bio (3 lines max)
│   years experience. Health-tested  │
│   parents, vet-checked puppies..." │
│                                     │
│  [ Contact Seller ]                │ ← CTA (Collar Gold)
│                                     │
└─────────────────────────────────────┘
```

### Detailed Specs

**Container**:
- Background: `var(--soft-cream)`
- Border: 1px solid rgba(14, 26, 34, 0.12)
- Border radius: 16px
- Padding: 32px
- Shadow: `var(--shadow-md)`
- Max width: 400px
- Text align: center

**Avatar**:
- Size: 96px × 96px
- Border radius: 50% (circle)
- Border: 3px solid `var(--yorkie-blue)`
- Object-fit: cover
- Margin: 0 auto 16px
- Background (empty): `var(--warm-fur-tan)` with initials

**Name**:
- Font: `var(--font-headline)` (Montserrat)
- Size: 24px (`var(--text-2xl)`)
- Weight: 600 (SemiBold)
- Color: `var(--midnight-charcoal)`
- Margin bottom: 8px

**Verification Badge** (inline with name):
- Display: inline-flex
- Align: center
- Gap: 4px
- Background: `var(--collar-gold)`
- Color: `var(--midnight-charcoal)`
- Padding: 4px 10px
- Border radius: 12px
- Font size: 12px
- Font weight: 500
- Icon: ⭐ or checkmark (12px)

**Star Rating**:
- Display: inline-flex
- Gap: 2px
- Size: 18px per star
- Color (filled): `var(--yorkie-blue)`
- Color (empty): `var(--gray-300)`
- Font size (text): 16px
- Weight: 600
- Format: "4.9 (47 reviews)"
- Margin bottom: 16px

**Trust Metrics Grid**:
- Display: grid
- Columns: 2
- Gap: 16px
- Margin bottom: 16px
- Background: white
- Border radius: 8px
- Padding: 16px
- Shadow: `var(--shadow-sm)`

**Metric Item**:
- Text align: center
- Label (top): 12px, uppercase, `var(--gray-600)`, letter-spacing: 1px
- Value (bottom): 16px, weight 600, `var(--midnight-charcoal)`

**Bio**:
- Font: `var(--font-body)`
- Size: 14px
- Line height: 1.6
- Color: rgba(14, 26, 34, 0.8)
- Max lines: 3
- Text overflow: ellipsis
- Margin bottom: 20px
- Text align: left (within centered container)

**CTA Button** (Contact Seller):
- Style: `btn-yorkie-primary`
- Background: `var(--collar-gold)`
- Color: `var(--midnight-charcoal)`
- Padding: 12px 32px
- Border radius: 8px
- Font size: 14px
- Font weight: 600
- Text transform: uppercase
- Letter spacing: 1px
- Width: 100%
- Shadow: `var(--shadow-sm)`
- Hover: lift + darker gold

### States

**Verified User**: Gold badge, blue avatar border
**Unverified User**: No badge, gray avatar border
**Premium User**: Additional "Premium" badge (secondary)
**New User**: "New Member" label instead of member-since date

### Responsive Behavior

- **Desktop**: 400px max width, full details
- **Tablet**: 360px max width, full details
- **Mobile**: Full width minus margins, stack metrics vertically

---

## Component Usage Examples

### React/Next.js Example (Listing Card)

```tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ListingCard({ listing }) {
  return (
    <div className="card-yorkie max-w-sm hover:shadow-md transition-all">
      <img
        src={listing.image}
        alt={listing.title}
        className="aspect-video object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-medium text-midnight-charcoal mb-2">
        {listing.title}
      </h3>
      <div className="flex justify-between items-center text-sm mb-3">
        <span className="text-gray-600">📍 {listing.location}</span>
        <span className="font-semibold text-midnight-charcoal">
          ${listing.price}
        </span>
      </div>
      {listing.verified && (
        <Badge className="badge-yorkie-verified">
          ⭐ Verified Breeder
        </Badge>
      )}
    </div>
  );
}
```

### Tailwind Example (Trust Panel)

```html
<div class="card-yorkie max-w-md text-center p-8">
  <img
    src="/avatars/sarah.jpg"
    alt="Sarah Johnson"
    class="w-24 h-24 rounded-full border-4 border-yorkie-blue mx-auto mb-4"
  />
  <h2 class="font-headline text-2xl font-semibold text-midnight-charcoal mb-2">
    Sarah Johnson
    <span class="badge-yorkie-verified ml-2">⭐ Verified</span>
  </h2>
  <div class="flex items-center justify-center gap-1 mb-4">
    <span class="text-yorkie-blue">★★★★★</span>
    <span class="text-base font-semibold ml-2">4.9 (47 reviews)</span>
  </div>
  <div class="grid grid-cols-2 gap-4 mb-4 bg-white rounded-lg p-4 shadow-sm">
    <div>
      <p class="text-xs uppercase text-gray-600 mb-1">Member Since</p>
      <p class="text-base font-semibold">2022</p>
    </div>
    <div>
      <p class="text-xs uppercase text-gray-600 mb-1">Response Rate</p>
      <p class="text-base font-semibold">98% (2hr)</p>
    </div>
  </div>
  <p class="text-sm text-gray-700 leading-relaxed mb-5 text-left">
    Ethical AKC breeder with 10+ years experience...
  </p>
  <button class="btn-yorkie-primary w-full">
    Contact Seller
  </button>
</div>
```

---

## Mockup Generation Notes

To create production-ready mockups of these components:

1. **Use Figma/Sketch** with the design tokens from `tokens/design-tokens.json`
2. **Import brand colors** exactly as specified
3. **Use actual Yorkie images** (free stock from Unsplash/Pexels with "Yorkie" search)
4. **Export as PNG** at 2x resolution (Retina) for clarity
5. **File naming**: `listing-card@2x.png`, `search-results@2x.png`, `trust-panel@2x.png`

---

**Version**: 2.0.0
**Last Updated**: December 2025
