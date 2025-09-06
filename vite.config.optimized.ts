import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Optimized Vite configuration with code splitting
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // Increase chunk size warning limit since we're consciously splitting
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual chunk strategy for optimal code splitting
        manualChunks: (id) => {
          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // Separate heavy libraries into their own chunks
            if (id.includes('html2canvas')) {
              return 'html2canvas'; // ~150KB - only loaded when download is clicked
            }
            if (id.includes('@mui')) {
              // Split MUI into separate chunks
              if (id.includes('@mui/icons-material')) {
                return 'mui-icons'; // Icons in separate chunk
              }
              return 'mui-core'; // Core MUI components
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'; // React core libraries
            }
            if (id.includes('@emotion')) {
              return 'emotion'; // Emotion styling library (MUI dependency)
            }
            // All other vendor libraries
            return 'vendor';
          }
          
          // Split application code
          if (id.includes('src/components/BrowserWindow')) {
            return 'browser-window'; // BrowserWindow in its own chunk
          }
          if (id.includes('src/utils')) {
            return 'utils'; // Utilities in separate chunk
          }
          if (id.includes('src/hooks')) {
            return 'hooks'; // Custom hooks
          }
        },
        // Use content hash for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Enable minification and tree shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Remove specific function calls
      },
    },
    // Generate source maps for debugging (optional, can be disabled for smaller builds)
    sourcemap: false,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled'
    ],
    exclude: ['html2canvas'] // Exclude from pre-bundling since we lazy load it
  }
})