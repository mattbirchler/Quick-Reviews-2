'use client';

import { forwardRef, useMemo } from 'react';
import { useReviewStore } from '@/stores/reviewStore';
import { themes, themeToCSSVariables, getContrastColor } from '@/config/themes';
import { cn } from '@/lib/utils';
import { ScoreSelector } from './ScoreSelector';

interface ReviewCardProps {
  className?: string;
  isExporting?: boolean;
}

export const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(
  function ReviewCard({ className, isExporting = false }, ref) {
    const { currentReview } = useReviewStore();

    // Get theme colors (with custom overrides applied)
    const themeColors = useMemo(() => {
      const baseTheme = themes[currentReview.themeId] || themes.home;
      const cssVars = themeToCSSVariables(baseTheme);

      // Apply custom color overrides if they exist
      if (currentReview.customColors) {
        if (currentReview.customColors.background) {
          cssVars['--card-background'] = currentReview.customColors.background;
          cssVars['--card-foreground'] = getContrastColor(
            currentReview.customColors.background
          );
        }
        if (currentReview.customColors.scores) {
          const { scores } = currentReview.customColors;
          if (scores.poor) {
            cssVars['--score-poor'] = scores.poor;
            cssVars['--score-poor-text'] = getContrastColor(scores.poor);
          }
          if (scores.okay) {
            cssVars['--score-okay'] = scores.okay;
            cssVars['--score-okay-text'] = getContrastColor(scores.okay);
          }
          if (scores.good) {
            cssVars['--score-good'] = scores.good;
            cssVars['--score-good-text'] = getContrastColor(scores.good);
          }
          if (scores.great) {
            cssVars['--score-great'] = scores.great;
            cssVars['--score-great-text'] = getContrastColor(scores.great);
          }
        }
      }

      return cssVars;
    }, [currentReview.themeId, currentReview.customColors]);

    // Font size styles
    const fontSizeStyles = useMemo(
      () => ({
        '--font-size-title': `${currentReview.fontSizes.title}px`,
        '--font-size-metadata': `${currentReview.fontSizes.metadata}px`,
        '--font-size-body': `${currentReview.fontSizes.body}px`,
      }),
      [currentReview.fontSizes]
    );

    return (
      <div
        ref={ref}
        className={cn('review-card', className)}
        style={{ ...themeColors, ...fontSizeStyles } as React.CSSProperties}
      >
        {/* Poster */}
        <div
          className="review-poster"
          style={{
            backgroundImage: currentReview.posterImage
              ? `url(${currentReview.posterImage})`
              : undefined,
          }}
        >
          {!currentReview.posterImage && (
            <div className="flex h-full items-center justify-center text-sm opacity-50">
              No poster
            </div>
          )}
        </div>

        {/* Content */}
        <div className="review-content">
          <div className="flex-1">
            {/* Title */}
            <h1 className="review-title">
              {currentReview.title || 'Movie Title'}
            </h1>

            {/* Metadata (year - director) */}
            {currentReview.metadata && (
              <p className="review-metadata mt-2">{currentReview.metadata}</p>
            )}

            {/* Review text */}
            <div className="review-text mt-4 whitespace-pre-wrap">
              {currentReview.reviewText || 'Your review will appear here...'}
            </div>
          </div>

          {/* Score selector */}
          <ScoreSelector isExporting={isExporting} />

          {/* Watermark - hidden during export */}
          {!isExporting && (
            <div className="mt-2 text-center text-xs opacity-30">
              Quick Reviews
            </div>
          )}
        </div>
      </div>
    );
  }
);
