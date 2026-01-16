// Theme configuration - replaces the 370-line themes.js with data-driven approach
// Each theme defines a complete color palette for the review card

export interface ThemeColors {
  background: string;
  text: string;
  scores: {
    poor: string;
    okay: string;
    good: string;
    great: string;
  };
}

export interface Theme {
  id: string;
  name: string;
  emoji: string;
  colors: ThemeColors;
}

export const themes: Record<string, Theme> = {
  home: {
    id: 'home',
    name: 'Home',
    emoji: '🏠',
    colors: {
      background: '#2B384F',
      text: '#ffffff',
      scores: {
        poor: '#E32401',
        okay: '#FFF995',
        good: '#02C7FC',
        great: '#B1FC8C',
      },
    },
  },
  ice: {
    id: 'ice',
    name: 'Ice',
    emoji: '🧊',
    colors: {
      background: '#d3f4ff',
      text: '#000000',
      scores: {
        poor: '#ff6666',
        okay: '#ffd966',
        good: '#85e0ff',
        great: '#00b8ff',
      },
    },
  },
  pink: {
    id: 'pink',
    name: 'Pink',
    emoji: '🩷',
    colors: {
      background: '#ffd6e0',
      text: '#000000',
      scores: {
        poor: '#ff4d6d',
        okay: '#ffb3c1',
        good: '#ff758f',
        great: '#c9184a',
      },
    },
  },
  blueberry: {
    id: 'blueberry',
    name: 'Blueberry',
    emoji: '🫐',
    colors: {
      background: '#2d3047',
      text: '#ffffff',
      scores: {
        poor: '#e63946',
        okay: '#f4a261',
        good: '#a8dadc',
        great: '#457b9d',
      },
    },
  },
  bee: {
    id: 'bee',
    name: 'Bee',
    emoji: '🐝',
    colors: {
      background: '#ffc107',
      text: '#000000',
      scores: {
        poor: '#dc3545',
        okay: '#fd7e14',
        good: '#ffc107',
        great: '#212529',
      },
    },
  },
  candy: {
    id: 'candy',
    name: 'Candy',
    emoji: '🍬',
    colors: {
      background: '#ff6b6b',
      text: '#ffffff',
      scores: {
        poor: '#c92a2a',
        okay: '#ffa8a8',
        good: '#ffe066',
        great: '#69db7c',
      },
    },
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    emoji: '🌊',
    colors: {
      background: '#0077b6',
      text: '#ffffff',
      scores: {
        poor: '#d62828',
        okay: '#f77f00',
        good: '#90e0ef',
        great: '#00b4d8',
      },
    },
  },
  blood: {
    id: 'blood',
    name: 'Blood',
    emoji: '🩸',
    colors: {
      background: '#1a1a1d',
      text: '#ffffff',
      scores: {
        poor: '#4e0000',
        okay: '#6a040f',
        good: '#9d0208',
        great: '#dc2f02',
      },
    },
  },
  peach: {
    id: 'peach',
    name: 'Peach',
    emoji: '🍑',
    colors: {
      background: '#ffcdb2',
      text: '#000000',
      scores: {
        poor: '#e5383b',
        okay: '#ffb4a2',
        good: '#e5989b',
        great: '#b5838d',
      },
    },
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    emoji: '🌲',
    colors: {
      background: '#1b4332',
      text: '#ffffff',
      scores: {
        poor: '#9b2226',
        okay: '#ee9b00',
        good: '#52b788',
        great: '#95d5b2',
      },
    },
  },
};

export const themeKeys = Object.keys(themes) as (keyof typeof themes)[];

export const defaultTheme = themes.home;

// Helper to get contrasting text color for any background
export function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
}

// Generate CSS variables from a theme
export function themeToCSSVariables(theme: Theme): Record<string, string> {
  return {
    '--card-background': theme.colors.background,
    '--card-foreground': theme.colors.text,
    '--score-poor': theme.colors.scores.poor,
    '--score-poor-text': getContrastColor(theme.colors.scores.poor),
    '--score-okay': theme.colors.scores.okay,
    '--score-okay-text': getContrastColor(theme.colors.scores.okay),
    '--score-good': theme.colors.scores.good,
    '--score-good-text': getContrastColor(theme.colors.scores.good),
    '--score-great': theme.colors.scores.great,
    '--score-great-text': getContrastColor(theme.colors.scores.great),
  };
}
