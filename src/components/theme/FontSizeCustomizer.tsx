'use client';

import { useReviewStore } from '@/stores/reviewStore';
import { DEFAULT_FONT_SIZES } from '@/config/defaults';
import { ChevronDown, ChevronUp, Minus, Plus, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface FontSizeControlProps {
  label: string;
  value: number;
  defaultValue: number;
  onChange: (size: number) => void;
}

function FontSizeControl({
  label,
  value,
  defaultValue,
  onChange,
}: FontSizeControlProps) {
  const increment = () => onChange(Math.min(100, value + 2));
  const decrement = () => onChange(Math.max(8, value - 2));
  const reset = () => onChange(defaultValue);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/70">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-12 text-center text-sm font-mono">{value}px</span>

        <button
          onClick={increment}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={`Increase ${label}`}
        >
          <Plus className="w-4 h-4" />
        </button>

        {value !== defaultValue && (
          <button
            onClick={reset}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={`Reset ${label}`}
            title="Reset to default"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export function FontSizeCustomizer() {
  const { currentReview, setFontSize } = useReviewStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasCustomSizes =
    currentReview.fontSizes.title !== DEFAULT_FONT_SIZES.title ||
    currentReview.fontSizes.metadata !== DEFAULT_FONT_SIZES.metadata ||
    currentReview.fontSizes.body !== DEFAULT_FONT_SIZES.body;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm font-medium text-white/80
                   p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span>Font Sizes</span>
        <div className="flex items-center gap-2">
          {hasCustomSizes && (
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
          <FontSizeControl
            label="Title"
            value={currentReview.fontSizes.title}
            defaultValue={DEFAULT_FONT_SIZES.title}
            onChange={(size) => setFontSize('title', size)}
          />

          <FontSizeControl
            label="Metadata"
            value={currentReview.fontSizes.metadata}
            defaultValue={DEFAULT_FONT_SIZES.metadata}
            onChange={(size) => setFontSize('metadata', size)}
          />

          <FontSizeControl
            label="Body"
            value={currentReview.fontSizes.body}
            defaultValue={DEFAULT_FONT_SIZES.body}
            onChange={(size) => setFontSize('body', size)}
          />
        </div>
      )}
    </div>
  );
}
