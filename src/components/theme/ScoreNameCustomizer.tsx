'use client';

import { useReviewStore } from '@/stores/reviewStore';
import { DEFAULT_SCORE_NAMES } from '@/config/defaults';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export function ScoreNameCustomizer() {
  const { currentReview, setScoreName } = useReviewStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasCustomNames = currentReview.scoreNames.some(
    (name, i) => name !== DEFAULT_SCORE_NAMES[i]
  );

  const resetAll = () => {
    DEFAULT_SCORE_NAMES.forEach((name, i) => setScoreName(i, name));
  };

  const scoreLabels = ['Bad (1)', 'Okay (2)', 'Good (3)', 'Great (4)'];

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm font-medium text-white/80
                   p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span>Score Labels</span>
        <div className="flex items-center gap-2">
          {hasCustomNames && (
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
        <div className="space-y-3 p-4 bg-white/5 rounded-xl animate-fade-in">
          {currentReview.scoreNames.map((name, index) => (
            <div key={index}>
              <label className="block text-xs text-white/50 mb-1">
                {scoreLabels[index]}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setScoreName(index, e.target.value)}
                placeholder={DEFAULT_SCORE_NAMES[index]}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                         text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400
                         placeholder:text-white/30"
              />
            </div>
          ))}

          {hasCustomNames && (
            <button
              onClick={resetAll}
              className="w-full flex items-center justify-center gap-2 p-2 text-sm
                       text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to defaults
            </button>
          )}
        </div>
      )}
    </div>
  );
}
