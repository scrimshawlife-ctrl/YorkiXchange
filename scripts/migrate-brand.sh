#!/bin/bash
# YorkiExchange Brand Migration Script
# Run this after merging the rebrand PR to complete the migration

set -e

echo "🎨 YorkiExchange Brand Migration"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Verify we're on the right branch
echo "📍 Step 1: Checking git status..."
CURRENT_BRANCH=$(git branch --show-current)
echo "   Current branch: $CURRENT_BRANCH"

if [[ $CURRENT_BRANCH != "main" && $CURRENT_BRANCH != "master" ]]; then
    echo -e "${YELLOW}⚠️  You're not on main/master. Continue anyway? (y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Step 2: Install dependencies
echo ""
echo "📦 Step 2: Installing dependencies..."
npm ci

# Step 3: Type check
echo ""
echo "🔍 Step 3: Running TypeScript type check..."
npm run typecheck
echo -e "${GREEN}✓ Type check passed${NC}"

# Step 4: Lint
echo ""
echo "🧹 Step 4: Running ESLint..."
npm run lint
echo -e "${GREEN}✓ Lint passed${NC}"

# Step 5: Verify brand assets exist
echo ""
echo "🎨 Step 5: Verifying brand assets..."

ASSETS=(
    "public/assets/brand/yorkiexchange-badge.svg"
    "public/assets/brand/yorkiexchange-wordmark.svg"
    "public/assets/brand/yorkiexchange-mark.svg"
    "public/assets/brand/favicon.svg"
    "brand-kit/tokens/design-tokens.json"
    "brand-kit/tokens/tokens.css"
    "brand-kit/tokens/tailwind.config.js"
)

for asset in "${ASSETS[@]}"; do
    if [ -f "$asset" ]; then
        echo -e "   ${GREEN}✓${NC} $asset"
    else
        echo -e "   ${YELLOW}✗${NC} $asset (missing)"
        exit 1
    fi
done

# Step 6: Check for old brand references
echo ""
echo "🔍 Step 6: Checking for old brand references..."
OLD_REFS=$(grep -r "YorkiXchange" --include="*.tsx" --include="*.ts" . 2>/dev/null | grep -v node_modules | grep -v ".next" | grep -v ".git" | grep -v "brand-kit" | wc -l)

if [ "$OLD_REFS" -eq 0 ]; then
    echo -e "   ${GREEN}✓ No old brand references found${NC}"
else
    echo -e "   ${YELLOW}⚠️  Found $OLD_REFS old brand reference(s)${NC}"
    echo "   Review these before deploying:"
    grep -r "YorkiXchange" --include="*.tsx" --include="*.ts" . 2>/dev/null | grep -v node_modules | grep -v ".next" | grep -v ".git" | grep -v "brand-kit"
fi

# Step 7: Optional - Clean up old assets
echo ""
echo "🗑️  Step 7: Clean up old brand assets?"
echo "   This will remove yorkixchange-* files (old brand)"
echo "   The new yorkiexchange-* files will remain."
echo ""
echo -e "${YELLOW}   Remove old assets? (y/N)${NC}"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "   Removing old assets..."
    rm -f public/assets/brand/yorkixchange-*.svg
    rm -f assets/brand/yorkixchange-*.svg
    echo -e "   ${GREEN}✓ Old assets removed${NC}"
else
    echo "   Keeping old assets for backwards compatibility"
fi

# Step 8: Summary
echo ""
echo "================================="
echo -e "${GREEN}✅ Migration Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo "   1. Review brand kit: cat brand-kit/README.md"
echo "   2. Import design tokens to your CSS/Tailwind config"
echo "   3. Generate app icons: see brand-kit/icons/ICON-GENERATION.md"
echo "   4. Deploy to staging for testing"
echo "   5. Update external platforms (social media, marketing)"
echo ""
echo "📖 Documentation:"
echo "   - Quick Start: brand-kit/README.md"
echo "   - Brand Guide: brand-kit/brand-guide/BRAND-GUIDE.md"
echo "   - Handoff: brand-kit/HANDOFF.md"
echo ""
echo "🚀 Ready to deploy!"
