import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/Header';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { MigrationBanner } from '@/components/layout/MigrationBanner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quick Reviews',
  description: 'Create beautiful movie review cards and share them anywhere',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon@192.png',
    apple: '/icon@512.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1a1a2e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1a1a2e] text-white antialiased">
        <Header />
        {children}
        <CommandPalette />
        <MigrationBanner />
      </body>
    </html>
  );
}
