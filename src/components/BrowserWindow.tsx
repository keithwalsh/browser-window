import React, { useState } from 'react';
import { Box, Slider, Paper, useTheme as useMuiTheme } from '@mui/material';
import styles from './BrowserWindow.module.css';
import { useTheme } from '../theme/useTheme';

interface BrowserWindowProps {
  imageUrl: string;
  url?: string;
  initialWidth?: number;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({ 
  imageUrl, 
  url: initialUrl = 'http://localhost:3000',
  initialWidth = 800 
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  
  const handleUrlClick = () => {
    setIsEditingUrl(true);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleUrlBlur = () => {
    setIsEditingUrl(false);
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingUrl(false);
    }
  };

  const handleResize = (_event: Event, newValue: number | number[]) => {
    setWidth(newValue as number);
  };

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
            { value: 800, label: '800px' },
            { value: 1200, label: '1200px' }
          ]}
          min={400}
          max={1200}
        />
      </Box>
      
      <Paper 
        elevation={mode === 'dark' ? 3 : 1}
        sx={{
          maxWidth: `${width}px`,
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background-color 0.3s ease',
          }}
        >
          <img src={imageUrl} alt="Browser window content" className={styles.browserImage} />
        </Box>
      </Paper>
    </Box>
  );
};

export default BrowserWindow; 