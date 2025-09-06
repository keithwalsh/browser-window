/**
 * @fileoverview Browser window component that displays an image within a
 * resizable browser-like interface with URL bar and window controls.
 */

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Box, Slider, Paper, Button, useTheme as useMuiTheme } from '@mui/material';
import { Download } from '@mui/icons-material';
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
  /** Callback function for the download button */
  onDownload?: () => void;
  /** Whether the download is in progress */
  isDownloading?: boolean;
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
  initialWidth = 800,
  onDownload,
  isDownloading = false
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
    <Box sx={{ width: '100%' }} component="section" role="region" aria-label="Browser window mockup">
      <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', mb: 1, mt: 4 }}>
        <Slider
          value={width}
          onChange={handleResize}
          aria-labelledby="window-width-slider"
          aria-describedby="width-description"
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}px`}
          step={10}
          marks={[
            { value: 400, label: '400px' },
            { value: 700, label: '700px' },
            { value: 1000, label: '1000px' }
          ]}
          min={400}
          max={1000}
          sx={{
            '& .MuiSlider-thumb': {
              '&:focus-visible': {
                boxShadow: `0 0 0 3px ${muiTheme.palette.primary.main}40`,
              },
            },
          }}
        />
      </Box>
      
      {onDownload && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Download />}
            onClick={onDownload}
            disabled={isDownloading}
            aria-label="Download browser window as PNG image"
            aria-describedby="download-description"
            sx={{ 
              transition: 'all 0.3s ease',
              fontWeight: 500,
              '&:focus-visible': {
                outline: '3px solid',
                outlineColor: 'success.main',
                outlineOffset: '2px',
              },
            }}
          >
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
        </Box>
      )}
      
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
          component="header"
          role="banner"
          aria-label="Browser window controls and address bar"
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
            component="div"
            role="textbox"
            aria-label="Website URL address bar"
            aria-describedby="url-instructions"
            tabIndex={isEditingUrl ? -1 : 0}
            onClick={handleUrlClick}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !isEditingUrl) {
                e.preventDefault();
                handleUrlClick();
              }
            }}
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
              '&:focus-visible': {
                outline: `2px solid ${muiTheme.palette.primary.main}`,
                outlineOffset: '2px',
              },
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.9)',
              },
            }}
          >
            {isEditingUrl ? (
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                onKeyDown={handleUrlKeyDown}
                aria-label="Edit website URL"
                aria-describedby="url-edit-instructions"
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
          
          {/* Hidden instructions for screen readers */}
          <Box 
            id="url-instructions" 
            sx={{ 
              position: 'absolute', 
              left: '-10000px', 
              width: '1px', 
              height: '1px', 
              overflow: 'hidden' 
            }}
          >
            Click or press Enter to edit the URL
          </Box>
          <Box 
            id="url-edit-instructions" 
            sx={{ 
              position: 'absolute', 
              left: '-10000px', 
              width: '1px', 
              height: '1px', 
              overflow: 'hidden' 
            }}
          >
            Press Enter to save, Escape to cancel
          </Box>
          
          <Box sx={{ marginLeft: 'auto' }}>
            <Box
              component="button"
              role="button"
              aria-label="Browser menu"
              tabIndex={0}
              sx={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                '&:focus-visible': {
                  outline: `2px solid ${muiTheme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                },
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Menu functionality could be added here
                }
              }}
            >
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
            </Box>
          </Box>
        </Box>

        <Box 
          component="main"
          role="main"
          aria-label="Browser window content area"
          sx={{
            backgroundColor: mode === 'dark' ? muiTheme.palette.background.paper : '#fff',
            padding: '1rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          <img 
            src={imageUrl} 
            alt="User-uploaded content displayed in browser window mockup" 
            className={styles.browserImage}
            loading="lazy"
          />
        </Box>
      </Paper>
      
      {/* Hidden descriptions for screen readers */}
      <Box 
        id="download-description" 
        sx={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
      >
        Downloads the browser window mockup as a PNG image file
      </Box>
    </Box>
  );
});

BrowserWindow.displayName = 'BrowserWindow';

export default BrowserWindow; 