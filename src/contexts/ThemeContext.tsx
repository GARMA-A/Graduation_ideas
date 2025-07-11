import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


interface ColorModeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
}



const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export { ColorModeContext };

export function ColorModeProvider({ children }: { children: React.ReactNode }) {

  const getDefaultMode = (): PaletteMode =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [mode, setMode] = useState<PaletteMode>(getDefaultMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === 'light' ? "#2A2B2A" : "#0C0C0C" },
          secondary: { main: mode === 'light' ? "#706C61" : "#1B1B1B" },
          background: {
            default: mode === 'light' ? "#D8D8D8" : "#0C0C0C",
            paper: mode === 'light' ? "#706C61" : "#1B1B1B",
          },
        },
        components: {
          MuiAppBar: {
            defaultProps: {
              enableColorOnDark: true,
            },
          },
        },
      }),
    [mode]
  );
  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };


  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

