// Default values for reviews and customization

export const DEFAULT_SCORE_NAMES = [
  "Didn't Like It",
  "Decent",
  "Liked It",
  "Loved It!",
] as const;

export const DEFAULT_FONT_SIZES = {
  title: 48,
  metadata: 28,
  body: 26,
} as const;

export const DEFAULT_FONT_SIZES_MOBILE = {
  title: 17,
  metadata: 10,
  body: 9,
} as const;

export const MOBILE_BREAKPOINT = 600;

export type ScoreValue = 1 | 2 | 3 | 4;

export interface ReviewData {
  id?: string;
  title: string;
  metadata: string;
  reviewText: string;
  score: ScoreValue;
  posterImage: string | null;
  posterSource: 'upload' | 'url';
  themeId: string;
  customColors: {
    background?: string;
    scores?: {
      poor?: string;
      okay?: string;
      good?: string;
      great?: string;
    };
  } | null;
  scoreNames: string[];
  fontSizes: {
    title: number;
    metadata: number;
    body: number;
  };
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const createEmptyReview = (): ReviewData => ({
  title: '',
  metadata: '',
  reviewText: '',
  score: 4,
  posterImage: null,
  posterSource: 'upload',
  themeId: 'home',
  customColors: null,
  scoreNames: [...DEFAULT_SCORE_NAMES],
  fontSizes: { ...DEFAULT_FONT_SIZES },
  isPublic: false,
});
