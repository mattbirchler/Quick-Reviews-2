'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Command, History, Plus, LogIn } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
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
          {/* Create new */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors',
              pathname === '/'
                ? 'bg-blue-500 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            )}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </Link>

          {/* Reviews history */}
          <SignedIn>
            <Link
              href="/reviews"
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors',
                pathname === '/reviews'
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">My Reviews</span>
            </Link>
          </SignedIn>

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

          {/* Auth */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8',
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                       bg-white/10 hover:bg-white/20 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
