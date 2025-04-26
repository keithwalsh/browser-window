import * as React from 'react';
import { 
  IconButton, 
  Tooltip, 
  useTheme as useMuiTheme,
  Paper,
  Box
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../theme/useTheme';

const ThemeToggle: React.FC = () => {
  const themeContext = useTheme();
  const { mode, toggleTheme } = themeContext;
  const muiTheme = useMuiTheme();
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: muiTheme.zIndex.appBar + 1,
      }}
    >
      <Paper
        elevation={isDark ? 2 : 1}
        sx={{
          borderRadius: '50%',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
          <IconButton 
            onClick={toggleTheme} 
            color="primary"
            aria-label="toggle light/dark theme"
            size="medium"
            sx={{ 
              p: 1.5,
              transition: 'all 0.3s ease',
            }}
          >
            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Paper>
    </Box>
  );
};

export default ThemeToggle; 