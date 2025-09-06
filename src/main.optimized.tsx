/**
 * @fileoverview Optimized entry point for the application with code splitting
 * and performance improvements.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import AppOptimized from './AppOptimized.tsx'
import { ThemeProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppOptimized />
    </ThemeProvider>
  </StrictMode>,
)