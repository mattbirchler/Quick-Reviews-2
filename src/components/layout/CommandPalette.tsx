'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useReviewStore } from '@/stores/reviewStore';
import { ScoreValue } from '@/config/defaults';
import {
  Pencil,
  Download,
  Palette,
  Type,
  Hash,
  RotateCcw,
  Star,
  Copy,
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette, openEditModal, toggleSection } =
    useUIStore();
  const { setScore, resetReview, currentReview } = useReviewStore();

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define available commands
  const commands: Command[] = useMemo(
    () => [
      {
        id: 'edit',
        label: 'Edit Review',
        shortcut: '⌘E',
        icon: <Pencil className="w-4 h-4" />,
        action: () => {
          closeCommandPalette();
          openEditModal();
        },
      },
      {
        id: 'export',
        label: 'Export as Image',
        shortcut: '⌘S',
        icon: <Download className="w-4 h-4" />,
        action: () => {
          closeCommandPalette();
          document.querySelector<HTMLButtonElement>('[data-export-button]')?.click();
        },
      },
      {
        id: 'copy',
        label: 'Copy Review Text',
        shortcut: '⌘⇧C',
        icon: <Copy className="w-4 h-4" />,
        action: async () => {
          const text = `${currentReview.title}\n${currentReview.metadata}\n\n${currentReview.reviewText}\n\n${currentReview.scoreNames[currentReview.score - 1]}`;
          await navigator.clipboard.writeText(text);
          closeCommandPalette();
        },
      },
      {
        id: 'score-1',
        label: `Set Score: ${currentReview.scoreNames[0]}`,
        shortcut: '⌘1',
        icon: <Star className="w-4 h-4" />,
        action: () => {
          setScore(1 as ScoreValue);
          closeCommandPalette();
        },
      },
      {
        id: 'score-2',
        label: `Set Score: ${currentReview.scoreNames[1]}`,
        shortcut: '⌘2',
        icon: <Star className="w-4 h-4" />,
        action: () => {
          setScore(2 as ScoreValue);
          closeCommandPalette();
        },
      },
      {
        id: 'score-3',
        label: `Set Score: ${currentReview.scoreNames[2]}`,
        shortcut: '⌘3',
        icon: <Star className="w-4 h-4" />,
        action: () => {
          setScore(3 as ScoreValue);
          closeCommandPalette();
        },
      },
      {
        id: 'score-4',
        label: `Set Score: ${currentReview.scoreNames[3]}`,
        shortcut: '⌘4',
        icon: <Star className="w-4 h-4" />,
        action: () => {
          setScore(4 as ScoreValue);
          closeCommandPalette();
        },
      },
      {
        id: 'colors',
        label: 'Toggle Color Settings',
        icon: <Palette className="w-4 h-4" />,
        action: () => {
          toggleSection('colors');
          closeCommandPalette();
        },
      },
      {
        id: 'fonts',
        label: 'Toggle Font Settings',
        icon: <Type className="w-4 h-4" />,
        action: () => {
          toggleSection('fonts');
          closeCommandPalette();
        },
      },
      {
        id: 'scores',
        label: 'Toggle Score Labels',
        icon: <Hash className="w-4 h-4" />,
        action: () => {
          toggleSection('scores');
          closeCommandPalette();
        },
      },
      {
        id: 'reset',
        label: 'Start Fresh (Reset All)',
        icon: <RotateCcw className="w-4 h-4" />,
        action: () => {
          if (confirm('Reset all review data? This cannot be undone.')) {
            resetReview();
          }
          closeCommandPalette();
        },
      },
    ],
    [
      closeCommandPalette,
      openEditModal,
      setScore,
      resetReview,
      toggleSection,
      currentReview.scoreNames,
      currentReview.title,
      currentReview.metadata,
      currentReview.reviewText,
      currentReview.score,
    ]
  );

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    const lower = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lower) ||
        cmd.id.toLowerCase().includes(lower)
    );
  }, [commands, search]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Reset state when opening
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          (i) => (i - 1 + filteredCommands.length) % filteredCommands.length
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
      }
    },
    [filteredCommands, selectedIndex]
  );

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCommandPalette();
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="command-palette animate-slide-up" onKeyDown={handleKeyDown}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a command..."
          className="command-palette-input"
          autoFocus
        />

        <div className="command-palette-list">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-white/50">No commands found</div>
          ) : (
            filteredCommands.map((command, index) => (
              <div
                key={command.id}
                className={`command-palette-item ${
                  index === selectedIndex ? 'selected' : ''
                }`}
                onClick={() => command.action()}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/60">{command.icon}</span>
                  <span>{command.label}</span>
                </div>
                {command.shortcut && (
                  <span className="command-palette-shortcut">
                    {command.shortcut}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
