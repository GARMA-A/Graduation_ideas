import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

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
          primary: {
            main: mode === 'light' ? '#ffffff' : '#000000',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#000000',
          },
          text: {
            primary: mode === 'light' ? grey[900] : '#ffffff',
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

