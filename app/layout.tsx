import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import { profile } from "@/lib/content";
import "./globals.css";

// Variable Inter with the optical-size axis, so labels that turn heavier
// keep their width (Fluid Functionalism's fontWeights pair wght with opsz).
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zheerbarzan.dev"),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.bio,
  verification: { google: "jxtih5vfdtwOM82XjC5YZG6FaQ-ZW8vdvPAXme3XBTA" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description: profile.headline,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
