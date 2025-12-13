/**
 * Brand Showcase Component
 * Demonstrates all YorkiExchange brand assets and design tokens
 *
 * Usage: Import this component to test/preview the new brand
 */

import { BrandLogo } from "@/components/brand/BrandLogo";
import { MascotBubble } from "@/components/brand/MascotBubble";

export default function BrandShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="mx-auto max-w-6xl space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            YorkiExchange Brand Showcase
          </h1>
          <p className="text-gray-600">
            Version 2.0 — Official brand assets and design system
          </p>
        </div>

        {/* Logo Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
            Logo Variants
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Badge */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center space-y-4">
              <BrandLogo variant="badge" size={96} />
              <div>
                <h3 className="font-semibold text-gray-900">Badge</h3>
                <p className="text-sm text-gray-600">Hero sections, about page</p>
              </div>
            </div>

            {/* Wordmark */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center space-y-4">
              <BrandLogo variant="wordmark" size={40} />
              <div>
                <h3 className="font-semibold text-gray-900">Wordmark</h3>
                <p className="text-sm text-gray-600">Navigation, headers</p>
              </div>
            </div>

            {/* Mark */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center space-y-4">
              <BrandLogo variant="mark" size={64} />
              <div>
                <h3 className="font-semibold text-gray-900">Mark</h3>
                <p className="text-sm text-gray-600">Mobile nav, favicons</p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
            Color Palette
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {/* Yorkie Blue */}
            <div className="space-y-2">
              <div
                className="h-24 rounded-lg shadow-md"
                style={{ backgroundColor: '#1F6F9C' }}
              />
              <div>
                <p className="font-semibold text-sm">Yorkie Blue</p>
                <p className="text-xs text-gray-600">#1F6F9C</p>
                <p className="text-xs text-gray-500 mt-1">Primary brand</p>
              </div>
            </div>

            {/* Midnight Charcoal */}
            <div className="space-y-2">
              <div
                className="h-24 rounded-lg shadow-md"
                style={{ backgroundColor: '#0E1A22' }}
              />
              <div>
                <p className="font-semibold text-sm">Midnight Charcoal</p>
                <p className="text-xs text-gray-600">#0E1A22</p>
                <p className="text-xs text-gray-500 mt-1">Text, authority</p>
              </div>
            </div>

            {/* Warm Fur Tan */}
            <div className="space-y-2">
              <div
                className="h-24 rounded-lg shadow-md"
                style={{ backgroundColor: '#D8B58A' }}
              />
              <div>
                <p className="font-semibold text-sm">Warm Fur Tan</p>
                <p className="text-xs text-gray-600">#D8B58A</p>
                <p className="text-xs text-gray-500 mt-1">Secondary</p>
              </div>
            </div>

            {/* Soft Cream */}
            <div className="space-y-2">
              <div
                className="h-24 rounded-lg shadow-md border border-gray-200"
                style={{ backgroundColor: '#F4EFE9' }}
              />
              <div>
                <p className="font-semibold text-sm">Soft Cream</p>
                <p className="text-xs text-gray-600">#F4EFE9</p>
                <p className="text-xs text-gray-500 mt-1">Backgrounds</p>
              </div>
            </div>

            {/* Collar Gold */}
            <div className="space-y-2">
              <div
                className="h-24 rounded-lg shadow-md"
                style={{ backgroundColor: '#E2B23C' }}
              />
              <div>
                <p className="font-semibold text-sm">Collar Gold</p>
                <p className="text-xs text-gray-600">#E2B23C</p>
                <p className="text-xs text-gray-500 mt-1">CTAs only!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
            Typography
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Headlines — Montserrat SemiBold</p>
              <h1 className="text-4xl font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Welcome to YorkiExchange
              </h1>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Body — Inter Regular</p>
              <p className="text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your trusted marketplace and community for Yorkie lovers. Connect with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
            UI Components
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Buttons */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Buttons</h3>

              <button
                className="px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wide transition-all hover:shadow-md"
                style={{ backgroundColor: '#E2B23C', color: '#0E1A22' }}
              >
                Primary CTA
              </button>

              <button
                className="px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wide transition-all hover:shadow-md"
                style={{ backgroundColor: '#D8B58A', color: '#0E1A22' }}
              >
                Secondary
              </button>

              <button
                className="px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wide border-2 transition-all"
                style={{ borderColor: '#1F6F9C', color: '#1F6F9C' }}
              >
                Outline
              </button>
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Card Example</h3>

              <div
                className="rounded-lg p-6 shadow-sm"
                style={{ backgroundColor: '#F4EFE9' }}
              >
                <h4 className="font-medium text-lg mb-2" style={{ color: '#0E1A22' }}>
                  Adorable 8-week Yorkie
                </h4>
                <div className="flex justify-between text-sm mb-3" style={{ color: 'rgba(14, 26, 34, 0.7)' }}>
                  <span>📍 Austin, TX</span>
                  <span className="font-semibold" style={{ color: '#0E1A22' }}>$1,500</span>
                </div>
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium uppercase"
                  style={{ backgroundColor: '#E2B23C', color: '#0E1A22' }}
                >
                  ⭐ Verified
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mascot */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
            Brand Mascot
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center">
            <MascotBubble
              message="Hi! I'm the YorkiExchange mascot. Click me to see how tooltips work!"
              size={96}
            />
          </div>
        </section>

        {/* Badge Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
            Badges & Tags
          </h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium uppercase"
              style={{ backgroundColor: '#E2B23C', color: '#0E1A22' }}
            >
              ⭐ Verified
            </span>
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium uppercase"
              style={{ backgroundColor: '#1F6F9C', color: 'white' }}
            >
              Premium
            </span>
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium uppercase"
              style={{ backgroundColor: '#D8B58A', color: '#0E1A22' }}
            >
              Responsive
            </span>
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium uppercase bg-gray-200"
              style={{ color: '#0E1A22' }}
            >
              Member Since 2024
            </span>
          </div>
        </section>

        {/* Documentation Links */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
            Documentation
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/brand-kit/README.md"
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Quick Start Guide</h3>
              <p className="text-sm text-gray-600">Get up and running with the brand kit</p>
            </a>

            <a
              href="/brand-kit/brand-guide/BRAND-GUIDE.md"
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Complete Brand Guide</h3>
              <p className="text-sm text-gray-600">12-section comprehensive manual</p>
            </a>

            <a
              href="/brand-kit/tokens/design-tokens.json"
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Design Tokens</h3>
              <p className="text-sm text-gray-600">Colors, spacing, typography in JSON/CSS</p>
            </a>

            <a
              href="/brand-kit/copy/microcopy.json"
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Microcopy Library</h3>
              <p className="text-sm text-gray-600">60+ UI text snippets</p>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 pt-8 border-t">
          <p>YorkiExchange Brand Kit v2.0 — December 2025</p>
          <p className="mt-2">
            For questions, review{" "}
            <a href="/brand-kit/HANDOFF.md" className="text-blue-600 hover:underline">
              HANDOFF.md
            </a>
          </p>
        </footer>

      </div>
    </div>
  );
}
