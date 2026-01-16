'use client';

import { useReviewStore } from '@/stores/reviewStore';
import { cn } from '@/lib/utils';
import { ScoreValue } from '@/config/defaults';

interface ScoreSelectorProps {
  isExporting?: boolean;
}

const scoreConfig = [
  { value: 1 as ScoreValue, colorVar: 'poor', label: 'poor' },
  { value: 2 as ScoreValue, colorVar: 'okay', label: 'okay' },
  { value: 3 as ScoreValue, colorVar: 'good', label: 'good' },
  { value: 4 as ScoreValue, colorVar: 'great', label: 'great' },
];

export function ScoreSelector({ isExporting = false }: ScoreSelectorProps) {
  const { currentReview, setScore } = useReviewStore();

  const handleScoreClick = (score: ScoreValue) => {
    if (isExporting) return;
    setScore(score);

    // Trigger confetti for "Loved It" score
    if (score === 4) {
      triggerConfetti();
    }
  };

  return (
    <div className="flex gap-2">
      {scoreConfig.map(({ value, colorVar }) => (
        <button
          key={value}
          onClick={() => handleScoreClick(value)}
          disabled={isExporting}
          className={cn(
            'score-button',
            currentReview.score === value && 'selected'
          )}
          style={{
            backgroundColor: `var(--score-${colorVar})`,
            color: `var(--score-${colorVar}-text)`,
            borderColor:
              currentReview.score === value
                ? `var(--score-${colorVar}-text)`
                : 'transparent',
          }}
        >
          {currentReview.scoreNames[value - 1]}
        </button>
      ))}
    </div>
  );
}

// Simple confetti effect
function triggerConfetti() {
  if (typeof window === 'undefined') return;

  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${50 + (Math.random() - 0.5) * 30}%;
      top: 50%;
      border-radius: 2px;
      pointer-events: none;
      z-index: 1000;
      animation: confetti-fall 1s ease-out forwards;
    `;

    document.body.appendChild(confetti);

    // Add keyframes if not already present
    if (!document.getElementById('confetti-style')) {
      const style = document.createElement('style');
      style.id = 'confetti-style';
      style.textContent = `
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Remove after animation
    setTimeout(() => confetti.remove(), 1000);
  }
}
