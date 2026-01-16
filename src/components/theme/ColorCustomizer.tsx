'use client';

import { useReviewStore } from '@/stores/reviewStore';
import { themes } from '@/config/themes';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/70">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg cursor-pointer"
      />
    </div>
  );
}

export function ColorCustomizer() {
  const { currentReview, setCustomColor, setThemeId } = useReviewStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const baseTheme = themes[currentReview.themeId] || themes.home;

  // Get current colors (custom or from theme)
  const currentColors = {
    background:
      currentReview.customColors?.background || baseTheme.colors.background,
    poor:
      currentReview.customColors?.scores?.poor || baseTheme.colors.scores.poor,
    okay:
      currentReview.customColors?.scores?.okay || baseTheme.colors.scores.okay,
    good:
      currentReview.customColors?.scores?.good || baseTheme.colors.scores.good,
    great:
      currentReview.customColors?.scores?.great ||
      baseTheme.colors.scores.great,
  };

  // Reset to theme defaults
  const handleReset = () => {
    setThemeId(currentReview.themeId); // This clears custom colors
  };

  const hasCustomColors =
    currentReview.customColors &&
    (currentReview.customColors.background ||
      Object.values(currentReview.customColors.scores || {}).some(Boolean));

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm font-medium text-white/80
                   p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span>Custom Colors</span>
        <div className="flex items-center gap-2">
          {hasCustomColors && (
            <span className="text-xs text-blue-400">Modified</span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-4 p-4 bg-white/5 rounded-xl animate-fade-in">
          {/* Background */}
          <ColorPicker
            label="Background"
            value={currentColors.background}
            onChange={(color) => setCustomColor('background', color)}
          />

          <div className="h-px bg-white/10" />

          {/* Score colors */}
          <p className="text-xs text-white/50 uppercase tracking-wide">
            Score Colors
          </p>

          <ColorPicker
            label="Bad"
            value={currentColors.poor}
            onChange={(color) => setCustomColor('poor', color)}
          />

          <ColorPicker
            label="Okay"
            value={currentColors.okay}
            onChange={(color) => setCustomColor('okay', color)}
          />

          <ColorPicker
            label="Good"
            value={currentColors.good}
            onChange={(color) => setCustomColor('good', color)}
          />

          <ColorPicker
            label="Great"
            value={currentColors.great}
            onChange={(color) => setCustomColor('great', color)}
          />

          {/* Reset button */}
          {hasCustomColors && (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 p-2 text-sm
                       text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to theme defaults
            </button>
          )}
        </div>
      )}
    </div>
  );
}
