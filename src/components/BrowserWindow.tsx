import React, { useState } from 'react';
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

  const handleResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  return (
    <div>
      <div className={styles.resizeControls}>
        <label>
          Window Width: {width}px
          <input
            type="range"
            min="400"
            max="1200"
            value={width}
            onChange={handleResize}
            className={styles.resizeSlider}
          />
        </label>
      </div>
      
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