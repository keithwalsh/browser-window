import React, { useState, useMemo, ReactNode, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from './ThemeContextCore';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme mode from localStorage if available, otherwise use system preference
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    // Add event listener with newer API if available
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    return undefined;
  }, []);

  // Create the theme object with enhanced configuration
  const theme = useMemo(() => {
    // Create base theme
    let themeConfig = createTheme({
      palette: {
        mode,
        primary: {
          main: '#1976d2',
          ...(mode === 'dark' && {
            main: '#90caf9', // Lighter blue in dark mode for better contrast
          }),
        },
        secondary: {
          main: '#dc004e',
          ...(mode === 'dark' && {
            main: '#f48fb1', // Lighter pink in dark mode
          }),
        },
        background: {
          default: mode === 'light' ? '#fff' : '#121212',
          paper: mode === 'light' ? '#fff' : '#1e1e1e',
        },
        text: {
          primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
          secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
        },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
            },
          },
        },
      },
    });

    // Add responsive font sizes
    themeConfig = responsiveFontSizes(themeConfig);
    
    return themeConfig;
  }, [mode]);

  // Create context value
  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 