import { useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from './ThemeContext';

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1976d2' },
          background: {
            default: mode === 'dark' ? '#0f1724' : '#f5f7fb',
            paper: mode === 'dark' ? '#0b1220' : '#fff',
          },
        },
        components: {
          MuiPaper: { defaultProps: { elevation: 2 } },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
