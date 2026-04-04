import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';

import { createAppTheme, type ThemeMode } from './appTheme';

export type AppThemeProviderProps = {
  children: React.ReactNode;
  mode?: ThemeMode;
};

/**
 * Provides the shared MUI theme used by the app and Storybook.
 */
export function AppThemeProvider({
  children,
  mode = 'dark',
}: AppThemeProviderProps) {
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}