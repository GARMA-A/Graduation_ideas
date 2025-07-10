import { useContext } from 'react';
import { ColorModeContext } from './ThemeContext';

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
}
