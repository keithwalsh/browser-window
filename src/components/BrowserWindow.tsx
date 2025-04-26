import React, { useState } from 'react';
import { Box, Slider } from '@mui/material';
import styles from './BrowserWindow.module.css';

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
    <div>
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
          sx={{ color: '#1976d2' }}
        />
      </Box>
      
      <div className={styles.browserWindow} style={{ maxWidth: `${width}px` }}>
        <div className={styles.browserWindowHeader}>
          <div className={styles.buttons}>
            <span className={styles.dot} style={{ background: '#f25f58' }} />
            <span className={styles.dot} style={{ background: '#fbbe3c' }} />
            <span className={styles.dot} style={{ background: '#58cb42' }} />
          </div>
          <div 
            className={styles.browserWindowAddressBar}
            onClick={handleUrlClick}
          >
            {isEditingUrl ? (
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                onKeyDown={handleUrlKeyDown}
                className={styles.urlInput}
                autoFocus
              />
            ) : (
              url
            )}
          </div>
          <div className={styles.browserWindowMenuIcon}>
            <div>
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </div>
          </div>
        </div>

        <div className={styles.browserWindowBody}>
          <img src={imageUrl} alt="Browser window content" className={styles.browserImage} />
        </div>
      </div>
    </div>
  );
};

export default BrowserWindow; 