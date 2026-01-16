'use client';

import { useEffect, useState } from 'react';
import { useReviewStore } from '@/stores/reviewStore';
import { X, Upload } from 'lucide-react';

// Keys used by the old version of Quick Reviews
const LEGACY_KEYS = [
  'media_title',
  'media_meta',
  'media_review',
  'score',
  'poster_image',
  'container_background_color',
  'container_text_color',
  'text_size_title',
  'text_size_metadata',
  'text_size_review',
  'quick_score_1',
  'quick_score_2',
  'quick_score_3',
  'quick_score_4',
  'quick_score_color_1',
  'quick_score_color_2',
  'quick_score_color_3',
  'quick_score_color_4',
];

interface LegacyData {
  title: string;
  metadata: string;
  reviewText: string;
  score: number;
  posterImage: string | null;
  backgroundColor: string | null;
  fontSizes: {
    title: number;
    metadata: number;
    body: number;
  };
  scoreNames: string[];
  scoreColors: {
    poor: string | null;
    okay: string | null;
    good: string | null;
    great: string | null;
  };
}

export function MigrationBanner() {
  const { loadReview, currentReview } = useReviewStore();
  const [hasLegacyData, setHasLegacyData] = useState(false);
  const [legacyData, setLegacyData] = useState<LegacyData | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check for legacy data on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const title = localStorage.getItem('media_title');
    const reviewText = localStorage.getItem('media_review');

    // Only show if there's actual content
    if (title || reviewText) {
      const data: LegacyData = {
        title: title || '',
        metadata: localStorage.getItem('media_meta') || '',
        reviewText: (reviewText || '').replace(/<br\s*\/?>/gi, '\n'),
        score: parseInt(localStorage.getItem('score') || '4'),
        posterImage: localStorage.getItem('poster_image'),
        backgroundColor: localStorage.getItem('container_background_color'),
        fontSizes: {
          title: parseInt(localStorage.getItem('text_size_title') || '48'),
          metadata: parseInt(localStorage.getItem('text_size_metadata') || '28'),
          body: parseInt(localStorage.getItem('text_size_review') || '26'),
        },
        scoreNames: [
          localStorage.getItem('quick_score_1') || "Didn't Like It",
          localStorage.getItem('quick_score_2') || 'Decent',
          localStorage.getItem('quick_score_3') || 'Liked It',
          localStorage.getItem('quick_score_4') || 'Loved It!',
        ],
        scoreColors: {
          poor: localStorage.getItem('quick_score_color_1'),
          okay: localStorage.getItem('quick_score_color_2'),
          good: localStorage.getItem('quick_score_color_3'),
          great: localStorage.getItem('quick_score_color_4'),
        },
      };

      setLegacyData(data);
      setHasLegacyData(true);
    }
  }, []);

  // Import legacy data into the new format
  const handleImport = () => {
    if (!legacyData) return;

    loadReview({
      ...currentReview,
      title: legacyData.title,
      metadata: legacyData.metadata,
      reviewText: legacyData.reviewText,
      score: legacyData.score as 1 | 2 | 3 | 4,
      posterImage: legacyData.posterImage,
      fontSizes: legacyData.fontSizes,
      scoreNames: legacyData.scoreNames,
      customColors: legacyData.backgroundColor
        ? {
            background: legacyData.backgroundColor,
            scores: {
              poor: legacyData.scoreColors.poor || undefined,
              okay: legacyData.scoreColors.okay || undefined,
              good: legacyData.scoreColors.good || undefined,
              great: legacyData.scoreColors.great || undefined,
            },
          }
        : null,
    });

    clearLegacyData();
    setIsDismissed(true);
  };

  // Clear legacy data from localStorage
  const clearLegacyData = () => {
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
    setHasLegacyData(false);
    setLegacyData(null);
  };

  // Dismiss without importing
  const handleDismiss = () => {
    if (confirm('Dismiss without importing? Your old review data will be cleared.')) {
      clearLegacyData();
      setIsDismissed(true);
    }
  };

  // Don't render if no data or dismissed
  if (!hasLegacyData || isDismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto animate-slide-up">
      <div className="bg-blue-600 rounded-xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <Upload className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold">Found existing review data!</h3>
            <p className="text-sm text-blue-100 mt-1">
              We found a review from your previous session
              {legacyData?.title && `: "${legacyData.title}"`}.
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={handleImport}
                className="px-3 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium
                         hover:bg-blue-50 transition-colors"
              >
                Import Review
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-sm font-medium
                         hover:bg-blue-800 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
