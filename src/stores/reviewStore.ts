'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ReviewData,
  createEmptyReview,
  DEFAULT_SCORE_NAMES,
  DEFAULT_FONT_SIZES,
  ScoreValue,
} from '@/config/defaults';

interface ReviewState {
  // Current review being edited
  currentReview: ReviewData;

  // Actions
  setTitle: (title: string) => void;
  setMetadata: (metadata: string) => void;
  setReviewText: (text: string) => void;
  setScore: (score: ScoreValue) => void;
  setPosterImage: (image: string | null) => void;
  setThemeId: (themeId: string) => void;
  setCustomColor: (key: string, color: string) => void;
  setScoreName: (index: number, name: string) => void;
  setFontSize: (key: 'title' | 'metadata' | 'body', size: number) => void;
  resetReview: () => void;
  loadReview: (review: ReviewData) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      currentReview: createEmptyReview(),

      setTitle: (title) =>
        set((state) => ({
          currentReview: { ...state.currentReview, title },
        })),

      setMetadata: (metadata) =>
        set((state) => ({
          currentReview: { ...state.currentReview, metadata },
        })),

      setReviewText: (reviewText) =>
        set((state) => ({
          currentReview: { ...state.currentReview, reviewText },
        })),

      setScore: (score) =>
        set((state) => ({
          currentReview: { ...state.currentReview, score },
        })),

      setPosterImage: (posterImage) =>
        set((state) => ({
          currentReview: { ...state.currentReview, posterImage },
        })),

      setThemeId: (themeId) =>
        set((state) => ({
          currentReview: { ...state.currentReview, themeId, customColors: null },
        })),

      setCustomColor: (key, color) =>
        set((state) => {
          const customColors = state.currentReview.customColors || {
            background: undefined,
            scores: {},
          };

          if (key === 'background') {
            return {
              currentReview: {
                ...state.currentReview,
                customColors: { ...customColors, background: color },
              },
            };
          }

          // Score colors
          const scoreKey = key as 'poor' | 'okay' | 'good' | 'great';
          return {
            currentReview: {
              ...state.currentReview,
              customColors: {
                ...customColors,
                scores: { ...customColors.scores, [scoreKey]: color },
              },
            },
          };
        }),

      setScoreName: (index, name) =>
        set((state) => {
          const scoreNames = [...state.currentReview.scoreNames];
          scoreNames[index] = name;
          return {
            currentReview: { ...state.currentReview, scoreNames },
          };
        }),

      setFontSize: (key, size) =>
        set((state) => ({
          currentReview: {
            ...state.currentReview,
            fontSizes: { ...state.currentReview.fontSizes, [key]: size },
          },
        })),

      resetReview: () =>
        set({
          currentReview: createEmptyReview(),
        }),

      loadReview: (review) =>
        set({
          currentReview: review,
        }),
    }),
    {
      name: 'quick-reviews-current',
      partialize: (state) => ({ currentReview: state.currentReview }),
    }
  )
);
