import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RNUI Web',
  description: 'RNUI ScreenSchema web builder and preview',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
