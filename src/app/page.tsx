'use client';

import { useRef, useEffect, useState } from 'react';
import {
  ReviewCard,
  ReviewEditor,
  PosterUploader,
  ExportButton,
} from '@/components/review';
import {
  ThemeSelector,
  ColorCustomizer,
  FontSizeCustomizer,
  ScoreNameCustomizer,
} from '@/components/theme';
import { useUIStore } from '@/stores/uiStore';
import { useReviewStore } from '@/stores/reviewStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Pencil, RotateCcw } from 'lucide-react';

export default function Home() {
  const reviewRef = useRef<HTMLDivElement>(null);
  const { openEditModal } = useUIStore();
  const { resetReview } = useReviewStore();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  // Show loading state until client hydrates
  if (!mounted) {
    return (
      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse text-white/40">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Main content - Review Card */}
        <div className="flex flex-col items-center gap-6">
          {/* Review Card */}
          <ReviewCard ref={reviewRef} />

          {/* Action buttons */}
          <div className="flex gap-3 w-full max-w-[900px]">
            <button
              onClick={openEditModal}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6
                       bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
            >
              <Pencil className="w-5 h-5" />
              Edit Review
            </button>
            <div className="flex-1" data-export-button>
              <ExportButton
                reviewRef={reviewRef as React.RefObject<HTMLDivElement>}
              />
            </div>
          </div>

          {/* Quick tip */}
          <p className="text-sm text-white/40 text-center">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">⌘E</kbd>{' '}
            to edit •{' '}
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">⌘S</kbd>{' '}
            to save •{' '}
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">⌘K</kbd>{' '}
            for commands
          </p>
        </div>

        {/* Sidebar - Customization Options */}
        <aside className="space-y-6 lg:sticky lg:top-20">
          {/* Poster upload */}
          <PosterUploader />

          {/* Theme selection */}
          <ThemeSelector />

          {/* Customization sections */}
          <div className="space-y-2">
            <ColorCustomizer />
            <FontSizeCustomizer />
            <ScoreNameCustomizer />
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              if (confirm('Reset all review data? This cannot be undone.')) {
                resetReview();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4
                     text-red-400 hover:text-red-300 hover:bg-red-500/10
                     rounded-xl transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Start Fresh
          </button>
        </aside>
      </div>

      {/* Edit Modal */}
      <ReviewEditor />
    </main>
  );
}
