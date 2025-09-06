import React, { useRef } from 'react'
import { Typography, Box, Container, useTheme, Alert } from '@mui/material'
import { BrowserWindow, FileUploader, ThemeToggle, SectionErrorBoundary } from './components'
import { useFileReader, useDownloadImage } from './hooks'
import { isImageFile, formatFileSize } from './utils/fileHelpers'
import { extractFileMetadata, createFileSummary } from './utils/fileMetadataHelpers'
import type { BrowserWindowRef } from './components/BrowserWindow/BrowserWindow'

function App() {
  const initialUrl = 'http://localhost:3000'
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const browserWindowRef = useRef<BrowserWindowRef>(null)

  // Use the custom file reader hook
  const { content: imageUrl, readFile, error, file } = useFileReader({
    readAs: 'dataURL',
    acceptedTypes: ['image/*'],
    maxSize: 5 * 1024 * 1024 // 5MB limit
  })

  // Use the download hook
  const { downloadImage, isDownloading } = useDownloadImage()

  // Handler for file selection with business logic separated
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    await processFile(selectedFile)
  }

  // Handler for file drop
  const handleFileDrop = async (file: File) => {
    await processFile(file)
  }

  // Common file processing logic
  const processFile = async (selectedFile: File) => {
    // Extract metadata using pure utility functions
    const metadata = extractFileMetadata(selectedFile)
    const summary = createFileSummary(metadata)

    // Use pure utility function to check if it's an image
    if (!isImageFile(selectedFile)) {
      console.warn(`Selected file is not an image: ${selectedFile.type}`)
    }

    console.log(`Processing file: ${summary}`)
    await readFile(selectedFile)
  }

  // Handler for downloading the browser window
  const handleDownload = () => {
    const browserElement = browserWindowRef.current?.getBrowserWindowElement()
    if (browserElement) {
      downloadImage(browserElement, {
        filename: 'browser-window-screenshot',
        format: 'png',
        backgroundColor: isDark ? '#121212' : '#ffffff'
      })
    }
  }

  return (
    <Container maxWidth="lg" component="div" role="application" aria-label="Browser Window Mockup Application">
      <SectionErrorBoundary sectionName="Theme Toggle" minimal>
        <ThemeToggle />
      </SectionErrorBoundary>
      
      <Box 
        component="main"
        role="main"
        sx={{ 
          my: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 500,
            color: isDark ? 'primary.light' : 'primary.dark',
            mb: 3,
          }}
        >
          Browser Window Mockup
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2, maxWidth: 600 }}>
            {error}
          </Alert>
        )}

        {file && (
          <Alert severity="success" sx={{ mb: 2, maxWidth: 600 }}>
            Selected: {file.name} ({formatFileSize(file.size)})
          </Alert>
        )}
        
        <SectionErrorBoundary sectionName="File Uploader">
          <FileUploader
            accept="image/*"
            onFileChange={handleFileSelect}
            onFileDrop={handleFileDrop}
          />
        </SectionErrorBoundary>

        {imageUrl && typeof imageUrl === 'string' && (
          <SectionErrorBoundary sectionName="Browser Window Preview">
            <BrowserWindow 
              ref={browserWindowRef}
              imageUrl={imageUrl} 
              url={initialUrl}
              initialWidth={800}
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </SectionErrorBoundary>
        )}
        
      </Box>
    </Container>
  )
}

export default App
