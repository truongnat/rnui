import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RNUI — React Native UI Framework",
  description:
    "High-performance dual-layer UI design system for React Native. 55+ components, design tokens, headless hooks. New Architecture first. iOS & Android.",
  keywords: [
    "react native ui library",
    "react native component library",
    "react native design system",
    "react native headless components",
    "react native ui framework",
    "react native new architecture",
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
  alternates: { canonical: "https://rnui.dev" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
