'use client';

import Link from 'next/link';
import { Command } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export function Header() {
  const { openCommandPalette } = useUIStore();

  return (
    <header className="sticky top-0 z-40 bg-[#1a1a2e]/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Quick Reviews
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {/* Command palette */}
          <button
            onClick={openCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                     text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Command Palette (⌘K)"
          >
            <Command className="w-4 h-4" />
            <kbd className="hidden sm:inline px-1.5 py-0.5 bg-white/10 rounded text-xs">
              ⌘K
            </kbd>
          </button>
        </nav>
      </div>
    </header>
  );
}
