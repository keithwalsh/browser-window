/**
 * @fileoverview Example of route-based code splitting for even better optimization.
 * This demonstrates how to split code by routes/features if your app grows.
 */

import { lazy, Suspense } from 'react'
import { Box, CircularProgress } from '@mui/material'

// Simulate route-based code splitting
// Each "route" would be a separate chunk loaded on demand
const ImageEditor = lazy(() => 
  import(/* webpackChunkName: "image-editor" */ './features/ImageEditor')
    .catch(() => ({ default: () => <div>Image Editor Module Failed to Load</div> }))
)

const Gallery = lazy(() => 
  import(/* webpackChunkName: "gallery" */ './features/Gallery')
    .catch(() => ({ default: () => <div>Gallery Module Failed to Load</div> }))
)

const Settings = lazy(() => 
  import(/* webpackChunkName: "settings" */ './features/Settings')
    .catch(() => ({ default: () => <div>Settings Module Failed to Load</div> }))
)

// Global loading component
const PageLoader = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: '100vh'
  }}>
    <CircularProgress />
  </Box>
)

interface AppWithRoutesProps {
  currentView: 'editor' | 'gallery' | 'settings'
}

export function AppWithRoutes({ currentView }: AppWithRoutesProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      {currentView === 'editor' && <ImageEditor />}
      {currentView === 'gallery' && <Gallery />}
      {currentView === 'settings' && <Settings />}
    </Suspense>
  )
}

// Example of prefetching chunks for better UX
export const prefetchRoute = (route: 'editor' | 'gallery' | 'settings') => {
  switch(route) {
    case 'editor':
      import(/* webpackChunkName: "image-editor" */ './features/ImageEditor')
      break
    case 'gallery':
      import(/* webpackChunkName: "gallery" */ './features/Gallery')
      break
    case 'settings':
      import(/* webpackChunkName: "settings" */ './features/Settings')
      break
  }
}