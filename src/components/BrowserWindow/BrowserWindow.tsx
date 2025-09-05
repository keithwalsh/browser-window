/**
 * @fileoverview Browser window component that displays an image within a
 * resizable browser-like interface with URL bar and window controls.
 */

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Box, Slider, Paper, useTheme as useMuiTheme } from '@mui/material';
import styles from './BrowserWindow.module.css';
import { useTheme } from '../../theme/useTheme';
import { useEditableState, useSliderState } from '../../hooks';

/**
 * Props for the BrowserWindow component.
 */
interface BrowserWindowProps {
  /** The URL of the image to display in the browser window */
  imageUrl: string;
  /** The initial URL to display in the address bar */
  url?: string;
  /** The initial width of the browser window in pixels */
  initialWidth?: number;
}

/**
 * Ref interface for BrowserWindow component.
 */
export interface BrowserWindowRef {
  /** Get the browser window element for downloading */
  getBrowserWindowElement: () => HTMLElement | null;
}

/**
 * A browser window component that displays an image within a resizable,
 * browser-like interface with interactive URL bar and macOS-style window controls.
 * Supports dark and light themes with smooth transitions.
 */
const BrowserWindow = forwardRef<BrowserWindowRef, BrowserWindowProps>(({ 
  imageUrl, 
  url: initialUrl = 'http://localhost:3000',
  initialWidth = 800 
}, ref) => {
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const browserWindowRef = useRef<HTMLDivElement>(null);
  
  // Expose the browser window element through ref
  useImperativeHandle(ref, () => ({
    getBrowserWindowElement: () => browserWindowRef.current
  }));

  // Use custom hooks for state management
  const {
    value: url,
    isEditing: isEditingUrl,
    handleChange: handleUrlChange,
    handleKeyDown: handleUrlKeyDown,
    handleBlur: handleUrlBlur,
    handleClick: handleUrlClick
  } = useEditableState(initialUrl);

  const {
    value: width,
    handleChange: handleResize
  } = useSliderState(initialWidth, {
    min: 400,
    max: 1000,
    step: 10
  });

  return (
    <Box>
      <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', mb: 2 }}>
        <Slider
          value={width}
          onChange={handleResize}
          aria-labelledby="window-width-slider"
          valueLabelDisplay="auto"
          step={10}
          marks={[
            { value: 400, label: '400px' },
            { value: 700, label: '700px' },
            { value: 1000, label: '1000px' }
          ]}
          min={400}
          max={1000}
        />
      </Box>
      
      <Paper 
        ref={browserWindowRef}
        elevation={mode === 'dark' ? 3 : 1}
        sx={{
          width: `${width}px`,
          margin: '1rem auto',
          overflow: 'hidden',
          borderRadius: 1,
          transition: 'all 0.3s ease',
          border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          <div className={styles.buttons}>
            <span className={styles.dot} style={{ background: '#f25f58' }} />
            <span className={styles.dot} style={{ background: '#fbbe3c' }} />
            <span className={styles.dot} style={{ background: '#58cb42' }} />
          </div>
          
          <Box 
            onClick={handleUrlClick}
            sx={{
              flex: '1 0',
              margin: '0 1rem 0 0.5rem',
              borderRadius: '12.5px',
              backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
              color: mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
              padding: '5px 15px',
              fontSize: '13px',
              fontFamily: 'Arial, sans-serif',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'text',
              transition: 'all 0.3s ease',
            }}
          >
            {isEditingUrl ? (
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                onKeyDown={handleUrlKeyDown}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  fontFamily: 'Arial, sans-serif',
                  background: 'transparent',
                  color: mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
                }}
                autoFocus
              />
            ) : (
              url
            )}
          </Box>
          
          <Box sx={{ marginLeft: 'auto' }}>
            <div>
              <Box 
                component="span" 
                sx={{
                  width: '17px',
                  height: '3px',
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  margin: '3px 0',
                  display: 'block',
                  transition: 'background-color 0.3s ease',
                }} 
              />
              <Box 
                component="span" 
                sx={{
                  width: '17px',
                  height: '3px',
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  margin: '3px 0',
                  display: 'block',
                  transition: 'background-color 0.3s ease',
                }} 
              />
              <Box 
                component="span" 
                sx={{
                  width: '17px',
                  height: '3px',
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  margin: '3px 0',
                  display: 'block',
                  transition: 'background-color 0.3s ease',
                }} 
              />
            </div>
          </Box>
        </Box>

        <Box 
          sx={{
            backgroundColor: mode === 'dark' ? muiTheme.palette.background.paper : '#fff',
            padding: '1rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          <img src={imageUrl} alt="Browser window content" className={styles.browserImage} />
        </Box>
      </Paper>
    </Box>
  );
});

BrowserWindow.displayName = 'BrowserWindow';

export default BrowserWindow; 