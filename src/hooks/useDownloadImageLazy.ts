/**
 * @fileoverview Lazy-loaded version of useDownloadImage hook that dynamically
 * imports html2canvas only when needed, significantly reducing initial bundle size.
 */

import { useCallback, useState } from 'react';

/**
 * Options for configuring the image download functionality.
 */
interface DownloadImageOptions {
  /** The filename for the downloaded image (without extension) */
  filename?: string;
  /** The image format (png, jpeg, webp) */
  format?: 'png' | 'jpeg' | 'webp';
  /** The image quality for jpeg/webp formats (0-1) */
  quality?: number;
  /** Background color for transparent elements */
  backgroundColor?: string;
  /** Scale factor for higher resolution images */
  scale?: number;
}

/**
 * Custom hook that provides functionality to capture and download DOM elements as images.
 * Lazy loads html2canvas to reduce initial bundle size.
 */
export const useDownloadImageLazy = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadImage = useCallback(async (
    element: HTMLElement | null,
    options: DownloadImageOptions = {}
  ) => {
    if (!element) {
      setError('No element provided for download');
      return;
    }

    const {
      filename = 'browser-window',
      format = 'png',
      quality = 0.9,
      backgroundColor = '#ffffff',
      scale = 2
    } = options;

    setIsDownloading(true);
    setError(null);

    try {
      // Dynamically import html2canvas only when needed
      // This creates a separate chunk that's loaded on demand
      const { default: html2canvas } = await import('html2canvas');
      
      console.log('html2canvas loaded dynamically');
      console.log('Starting capture for element:', element);
      console.log('Element dimensions:', element.offsetWidth, 'x', element.offsetHeight);
      
      // Configure html2canvas options for precise element capture
      const canvas = await html2canvas(element, {
        background: undefined, // Use undefined for transparent background
        useCORS: false,
        allowTaint: true,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        // Additional options that exist in v1.4.1 but not in the outdated types
        ...{
          scale,
          scrollX: 0,
          scrollY: 0,
          windowWidth: element.offsetWidth,
          windowHeight: element.offsetHeight,
        }
      } as any);

      console.log('Canvas created:', canvas.width, 'x', canvas.height);

      // Check if canvas is empty
      if (canvas.width === 0 || canvas.height === 0) {
        setError('Canvas has zero dimensions');
        setIsDownloading(false);
        return;
      }

      // Create a new canvas with shadow effect
      const shadowCanvas = document.createElement('canvas');
      const shadowPadding = 15;
      shadowCanvas.width = canvas.width + shadowPadding * 2;
      shadowCanvas.height = canvas.height + shadowPadding * 2;
      
      const ctx = shadowCanvas.getContext('2d');
      if (!ctx) {
        setError('Failed to get canvas context');
        setIsDownloading(false);
        return;
      }

      // Set background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);

      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;

      // Draw the original canvas onto the shadow canvas
      ctx.drawImage(
        canvas, 
        shadowPadding, 
        shadowPadding, 
        canvas.width, 
        canvas.height
      );

      // Convert shadow canvas to blob
      const mimeType = format === 'png' ? 'image/png' : 
                     format === 'jpeg' ? 'image/jpeg' : 'image/webp';
      
      shadowCanvas.toBlob((blob) => {
        if (!blob) {
          setError('Failed to generate image blob');
          setIsDownloading(false);
          return;
        }

        console.log('Blob created, size:', blob.size, 'bytes');

        // Create download link and trigger download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.${format}`;
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      }, mimeType, quality);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download image');
      setIsDownloading(false);
    }
  }, []);

  return {
    downloadImage,
    isDownloading,
    error,
    clearError: () => setError(null)
  };
};