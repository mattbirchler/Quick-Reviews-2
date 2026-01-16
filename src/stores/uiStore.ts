'use client';

import { create } from 'zustand';

interface UIState {
  // Modal states
  isEditModalOpen: boolean;
  isCommandPaletteOpen: boolean;
  isExporting: boolean;

  // Expandable sections
  expandedSections: {
    colors: boolean;
    fonts: boolean;
    scores: boolean;
  };

  // Actions
  openEditModal: () => void;
  closeEditModal: () => void;
  toggleEditModal: () => void;

  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;

  setExporting: (exporting: boolean) => void;

  toggleSection: (section: 'colors' | 'fonts' | 'scores') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isEditModalOpen: false,
  isCommandPaletteOpen: false,
  isExporting: false,
  expandedSections: {
    colors: false,
    fonts: false,
    scores: false,
  },

  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false }),
  toggleEditModal: () => set((state) => ({ isEditModalOpen: !state.isEditModalOpen })),

  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

  setExporting: (isExporting) => set({ isExporting }),

  toggleSection: (section) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [section]: !state.expandedSections[section],
      },
    })),
}));
