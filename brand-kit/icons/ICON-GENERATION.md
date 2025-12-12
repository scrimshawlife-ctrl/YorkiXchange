# YorkiExchange Icon & Favicon Generation Guide

This document provides instructions for generating app icons and favicons for the YorkiExchange brand.

---

## Required Icon Sizes

### App Icons (PNG)
Generate the following sizes for various platforms:

- `app-icon-1024.png` — 1024×1024 (App Store, master)
- `app-icon-512.png` — 512×512 (Android, PWA)
- `app-icon-256.png` — 256×256 (Windows)
- `app-icon-128.png` — 128×128 (macOS, taskbar)
- `app-icon-64.png` — 64×64 (Desktop shortcuts)
- `app-icon-32.png` — 32×32 (Taskbar, small)
- `app-icon-16.png` — 16×16 (Favicon, smallest)

### Favicon Formats
- `favicon.ico` — Multi-resolution ICO (32×32, 16×16)
- `favicon.svg` — Modern browsers (vector, scalable)
- `favicon-32x32.png` — PNG fallback (32×32)
- `favicon-16x16.png` — PNG fallback (16×16)

---

## Design Specifications

### Base Design

**Background**:
- Solid color: `#1F6F9C` (Yorkie Blue)
- OR gradient: `#1F6F9C` → `#0E4A6B` (top to bottom)

**Foreground**:
- Use the simplified "mark" from `logos/yorkiexchange-mark.svg`
- Center the crest/Yorkie icon
- Ensure 10% padding (safe area) on all sides

**Border** (optional):
- 2px inset border in Midnight Charcoal (#0E1A22)
- Helps icon stand out on light backgrounds

**Color Palette**:
- Background: Yorkie Blue (#1F6F9C)
- Yorkie fur: Soft Cream (#F4EFE9) → Warm Fur Tan (#D8B58A) gradient
- Outlines: Midnight Charcoal (#0E1A22)
- Accent: Collar Gold (#E2B23C) for the collar/trust marker

---

## Generation Methods

### Method 1: Using Figma/Sketch/Illustrator

1. **Create artboard**: 1024×1024px
2. **Add background**: Yorkie Blue (#1F6F9C) fill
3. **Import mark SVG**: `/logos/yorkiexchange-mark.svg`
4. **Scale to fit**: Leave 10% safe area (920×920 actual content)
5. **Export at multiple sizes**:
   - File → Export → PNG
   - Check "2x" for retina quality
   - Batch export all required sizes

### Method 2: Using ImageMagick (Command Line)

```bash
# Convert SVG mark to PNG at 1024px
convert -background "#1F6F9C" -gravity center \
  -extent 1024x1024 logos/yorkiexchange-mark.svg \
  icons/app-icon-1024.png

# Generate all sizes from master
for size in 512 256 128 64 32 16; do
  convert icons/app-icon-1024.png \
    -resize ${size}x${size} \
    icons/app-icon-${size}.png
done
```

### Method 3: Using Node.js (sharp library)

```javascript
const sharp = require('sharp');
const sizes = [1024, 512, 256, 128, 64, 32, 16];

// Load SVG and create base 1024px PNG
sharp('logos/yorkiexchange-mark.svg')
  .resize(1024, 1024)
  .flatten({ background: '#1F6F9C' })
  .png()
  .toFile('icons/app-icon-1024.png')
  .then(() => {
    // Generate smaller sizes
    sizes.forEach(size => {
      sharp('icons/app-icon-1024.png')
        .resize(size, size)
        .png()
        .toFile(`icons/app-icon-${size}.png`);
    });
  });
```

### Method 4: Online Tool (RealFaviconGenerator.net)

1. Go to https://realfavicongenerator.net/
2. Upload `app-icon-1024.png`
3. Configure settings:
   - iOS: Use full image
   - Android: Use full image, theme color #1F6F9C
   - Windows: Use full image, tile color #1F6F9C
   - macOS Safari: Ignore (use PNG)
4. Download generated package
5. Extract to `icons/` directory

---

## Favicon ICO Generation

### Using ImageMagick
```bash
convert icons/app-icon-32.png icons/app-icon-16.png \
  -colors 256 icons/favicon.ico
```

### Using favicon.io
1. Visit https://favicon.io/favicon-converter/
2. Upload `app-icon-512.png`
3. Download `favicon.ico`
4. Place in `icons/` directory

### Using Node.js (to-ico library)
```javascript
const toIco = require('to-ico');
const fs = require('fs');

const files = [
  fs.readFileSync('icons/app-icon-32.png'),
  fs.readFileSync('icons/app-icon-16.png')
];

toIco(files).then(buf => {
  fs.writeFileSync('icons/favicon.ico', buf);
});
```

---

## SVG Favicon (Modern Browsers)

Create a simplified, single-color SVG for modern browsers:

```xml
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <title>YorkiExchange</title>
  <circle cx="50" cy="50" r="48" fill="#1F6F9C"/>
  <!-- Simplified Yorkie silhouette in white/cream -->
  <circle cx="50" cy="50" r="24" fill="#F4EFE9" stroke="#0E1A22" stroke-width="2"/>
  <circle cx="44" cy="47" r="3" fill="#0E1A22"/>
  <circle cx="56" cy="47" r="3" fill="#0E1A22"/>
  <path d="M 46 55 Q 50 58 54 55" stroke="#0E1A22" stroke-width="2" fill="none"/>
</svg>
```

Save as `icons/favicon.svg`

---

## HTML Implementation

### In `<head>` section:

```html
<!-- Modern browsers (SVG) -->
<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg">

<!-- Fallback ICO -->
<link rel="icon" type="image/x-icon" href="/icons/favicon.ico">

<!-- PNG fallbacks for different sizes -->
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/icons/app-icon-180.png">

<!-- Android/Chrome -->
<link rel="icon" sizes="192x192" href="/icons/app-icon-192.png">
<link rel="icon" sizes="512x512" href="/icons/app-icon-512.png">

<!-- Microsoft Tiles -->
<meta name="msapplication-TileColor" content="#1F6F9C">
<meta name="msapplication-TileImage" content="/icons/app-icon-144.png">

<!-- Theme color -->
<meta name="theme-color" content="#1F6F9C">
```

---

## PWA Manifest (manifest.json)

```json
{
  "name": "YorkiExchange",
  "short_name": "YorkiExchange",
  "description": "Trusted marketplace for Yorkie lovers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F4EFE9",
  "theme_color": "#1F6F9C",
  "icons": [
    {
      "src": "/icons/app-icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/app-icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## Quality Checklist

Before finalizing icons, verify:

- [ ] All sizes generated (1024→16px)
- [ ] Background color is Yorkie Blue (#1F6F9C)
- [ ] Icon is centered with 10% safe area
- [ ] Outlines are crisp at 32px and 16px
- [ ] favicon.ico contains 32px + 16px versions
- [ ] SVG favicon works in Chrome/Firefox
- [ ] Colors match brand palette exactly
- [ ] No transparency issues on dark backgrounds
- [ ] PNG files are optimized (TinyPNG/ImageOptim)

---

## File Structure

After generation, your `icons/` directory should look like:

```
icons/
├── app-icon-1024.png
├── app-icon-512.png
├── app-icon-256.png
├── app-icon-192.png  (for PWA)
├── app-icon-180.png  (for Apple)
├── app-icon-128.png
├── app-icon-64.png
├── app-icon-32.png
├── app-icon-16.png
├── favicon.ico
├── favicon.svg
├── favicon-32x32.png
├── favicon-16x16.png
└── ICON-GENERATION.md (this file)
```

---

## Notes

- **Safe area**: Keep important elements within the center 80% of the icon (avoid corners)
- **Testing**: Test icons at actual sizes (16px, 32px) to ensure clarity
- **Optimization**: Run PNG files through ImageOptim or TinyPNG to reduce file size
- **Versioning**: Add `?v=2.0` to icon URLs when updating to bust browser cache

---

**Version**: 2.0.0
**Last Updated**: December 2025
