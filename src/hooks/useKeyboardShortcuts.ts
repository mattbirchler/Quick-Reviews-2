'use client';

import { useEffect, useCallback } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useReviewStore } from '@/stores/reviewStore';
import { ScoreValue } from '@/config/defaults';

export function useKeyboardShortcuts() {
  const {
    openEditModal,
    closeEditModal,
    isEditModalOpen,
    openCommandPalette,
    closeCommandPalette,
    isCommandPaletteOpen,
  } = useUIStore();

  const { setScore, setFontSize, currentReview } = useReviewStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;

      // Escape - close modals
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) {
          closeCommandPalette();
          e.preventDefault();
          return;
        }
        if (isEditModalOpen) {
          closeEditModal();
          e.preventDefault();
          return;
        }
      }

      // Don't handle shortcuts if in an input (except Escape)
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow Cmd+Enter in inputs to save
        if (isMod && e.key === 'Enter') {
          closeEditModal();
          e.preventDefault();
        }
        return;
      }

      // Cmd/Ctrl + K - Command palette
      if (isMod && e.key === 'k') {
        e.preventDefault();
        if (isCommandPaletteOpen) {
          closeCommandPalette();
        } else {
          openCommandPalette();
        }
        return;
      }

      // Cmd/Ctrl + E - Edit modal
      if (isMod && e.key === 'e') {
        e.preventDefault();
        if (isEditModalOpen) {
          closeEditModal();
        } else {
          openEditModal();
        }
        return;
      }

      // Cmd/Ctrl + S - Export (handled by browser, but we prevent default)
      if (isMod && e.key === 's') {
        e.preventDefault();
        // Trigger export - this will be handled by clicking the export button
        document.querySelector<HTMLButtonElement>('[data-export-button]')?.click();
        return;
      }

      // Cmd/Ctrl + 1/2/3/4 - Set score
      if (isMod && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        setScore(parseInt(e.key) as ScoreValue);
        return;
      }

      // Shift + Arrow keys - Font size adjustment
      if (e.shiftKey && !isMod) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setFontSize('body', Math.min(100, currentReview.fontSizes.body + 2));
          return;
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFontSize('body', Math.max(8, currentReview.fontSizes.body - 2));
          return;
        }
      }
    },
    [
      isEditModalOpen,
      isCommandPaletteOpen,
      openEditModal,
      closeEditModal,
      openCommandPalette,
      closeCommandPalette,
      setScore,
      setFontSize,
      currentReview.fontSizes.body,
    ]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
