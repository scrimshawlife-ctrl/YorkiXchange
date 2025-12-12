import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "YorkiXchange",
  description: "Yorkie marketplace + forum",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
