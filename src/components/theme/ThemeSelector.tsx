'use client';

import { themes, themeKeys } from '@/config/themes';
import { useReviewStore } from '@/stores/reviewStore';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { currentReview, setThemeId } = useReviewStore();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/80">Theme</label>
      <div className="flex flex-wrap gap-2">
        {themeKeys.map((key) => {
          const theme = themes[key];
          const isSelected = currentReview.themeId === key;

          return (
            <button
              key={key}
              onClick={() => setThemeId(key)}
              className={cn(
                'w-12 h-12 rounded-xl text-xl transition-all duration-200',
                'hover:scale-110 hover:shadow-lg',
                isSelected && 'ring-2 ring-offset-2 ring-offset-[#1a1a2e] ring-green-400 scale-105'
              )}
              style={{ backgroundColor: theme.colors.background }}
              title={theme.name}
            >
              {theme.emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}
