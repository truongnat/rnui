import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RNUI — React Native UI Framework",
  description:
    "High-performance dual-layer UI design system for React Native. 55+ components, design tokens, headless hooks. Built for New Architecture (iOS & Android).",
  keywords: [
    "react native ui library",
    "react native component library",
    "react native design system",
    "react native headless components",
    "react native ui framework",
  ],
  openGraph: {
    title: "RNUI — React Native UI Framework",
    description:
      "55+ components. Dual-layer. New Architecture. iOS & Android.",
    url: "https://rnui.dev",
    siteName: "RNUI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RNUI — React Native UI Framework",
    description: "55+ components. Dual-layer. New Architecture.",
  },
  alternates: {
    canonical: "https://rnui.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
