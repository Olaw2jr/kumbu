import React, {createContext, useContext, useMemo, useState, useCallback} from 'react';
import {KumbuPalette, paperPalette, nightPalette} from './palette';
import {fonts, typeScaleFactors, ThemeMode, TypeScale} from './tokens';

interface ThemeContextValue {
  colors: KumbuPalette;
  fonts: typeof fonts;
  isDark: boolean;
  theme: ThemeMode;
  typeScale: TypeScale;
  typeScaleFactor: number;
  aaaContrast: boolean;
  reducedMotion: boolean;
  setTheme: (mode: ThemeMode) => void;
  setTypeScale: (scale: TypeScale) => void;
  setAaaContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
  initialTypeScale?: TypeScale;
  initialAaaContrast?: boolean;
  initialReducedMotion?: boolean;
}

export function ThemeProvider({
  children,
  initialTheme = 'paper',
  initialTypeScale = 'regular',
  initialAaaContrast = false,
  initialReducedMotion = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [typeScale, setTypeScale] = useState<TypeScale>(initialTypeScale);
  const [aaaContrast, setAaaContrast] = useState(initialAaaContrast);
  const [reducedMotion, setReducedMotion] = useState(initialReducedMotion);

  const colors = useMemo(() => {
    const base = theme === 'night' ? nightPalette : paperPalette;
    if (!aaaContrast) return base;
    return {
      ...base,
      inkSoft: base.ink,
      inkMute: base.inkSoft,
    };
  }, [theme, aaaContrast]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors,
      fonts,
      isDark: theme === 'night',
      theme,
      typeScale,
      typeScaleFactor: typeScaleFactors[typeScale],
      aaaContrast,
      reducedMotion,
      setTheme,
      setTypeScale,
      setAaaContrast,
      setReducedMotion,
    }),
    [colors, theme, typeScale, aaaContrast, reducedMotion],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
