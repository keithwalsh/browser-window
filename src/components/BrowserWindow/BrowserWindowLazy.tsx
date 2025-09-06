/**
 * @fileoverview Lazy-loaded wrapper for BrowserWindow component to enable
 * code splitting and reduce initial bundle size.
 */

import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

// Lazy load the BrowserWindow component
// This will create a separate chunk that's only loaded when needed
const BrowserWindow = lazy(() => import('./BrowserWindow'));

// Loading fallback component
const LoadingFallback = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: 400,
      p: 4
    }}
  >
    <CircularProgress />
  </Box>
);

// Export a wrapped version with Suspense
export const BrowserWindowLazy = (props: any) => (
  <Suspense fallback={<LoadingFallback />}>
    <BrowserWindow {...props} />
  </Suspense>
);

export default BrowserWindowLazy;