import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import SiteNav from "@/components/SiteNav";
import AuthIntegrityGate from "@/components/AuthIntegrityGate";

export const metadata: Metadata = {
  title: "YorkiExchange - Marketplace",
  description: "The friendly marketplace and community for Yorkie lovers. Buy, sell, adopt, and connect with fellow Yorkshire Terrier enthusiasts.",
  icons: {
    icon: "/assets/brand/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthIntegrityGate />
        <SiteNav />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
