import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';

// Dynamically import client components with SSR disabled to avoid hydration issues
const Header = dynamic(
  () => import('@/components/layout/Header').then((mod) => ({ default: mod.Header })),
  {
    ssr: false,
    loading: () => (
      <header className="sticky top-0 z-40 bg-[#1a1a2e]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <span className="text-xl font-bold">Quick Reviews</span>
        </div>
      </header>
    ),
  }
);

const CommandPalette = dynamic(
  () => import('@/components/layout/CommandPalette').then((mod) => ({ default: mod.CommandPalette })),
  { ssr: false }
);

const MigrationBanner = dynamic(
  () => import('@/components/layout/MigrationBanner').then((mod) => ({ default: mod.MigrationBanner })),
  { ssr: false }
);

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
