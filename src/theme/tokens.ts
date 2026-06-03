export const duration = {
  fast: 180,
  normal: 320,
  slow: 520,
  slower: 820,
  slowest: 1400,
} as const;

// Easing bezier control points — use with Reanimated's Easing.bezier()
// at call sites rather than storing Easing objects here, to avoid
// importing reanimated at module scope.
export const easingPoints = {
  default: [0.22, 1, 0.36, 1] as const,
  in: [0.64, 0, 0.78, 0] as const,
};

export const touchTarget = 44;

export const fonts = {
  serif: 'ShipporiMinchoB1',
  sans: 'InterTight',
  mono: 'JetBrainsMono',
} as const;

export const typeScaleFactors = {
  small: 0.92,
  regular: 1,
  large: 1.12,
} as const;

export type TypeScale = keyof typeof typeScaleFactors;
export type ThemeMode = 'paper' | 'night';
