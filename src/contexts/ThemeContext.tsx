import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';


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
          primary: { main: mode === 'light' ? "#706c61" : "#0C0C0C" },
          secondary: { main: mode === 'light' ? "#706C61" : "#1B1B1B" },
          background: {
            default: mode === 'light' ? grey[300] : "#0C0C0C",
            paper: mode === 'light' ? "#706C61" : "#1B1B1B",
          },
        },
        components: {
          MuiAppBar: {
            defaultProps: {
              enableColorOnDark: true,
            },
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.getContrastText(theme.palette.background.paper),
              }),
            },
          },
          MuiBottomNavigation: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.getContrastText(theme.palette.background.paper),
              }),
            },
          },
          MuiBottomNavigationAction: {
            styleOverrides: {
              root: ({ theme }) => ({
                // Force *all states* to use the AppBar color
                color: theme.palette.getContrastText(theme.palette.background.paper),
                '&.Mui-selected': {
                  color: theme.palette.getContrastText(theme.palette.background.paper),
                },
              }),
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

