import React, { useRef } from 'react'
import { Typography, Box, Container, useTheme, Alert, Button } from '@mui/material'
import { Download } from '@mui/icons-material'
import { BrowserWindow, FileUploader, ThemeToggle } from './components'
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
        backgroundColor: isDark ? '#121212' : '#ffffff',
        scale: 2
      })
    }
  }

  return (
    <Container maxWidth="lg">
      <ThemeToggle />
      <Box 
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
        
        <FileUploader
          buttonText="Select Image"
          accept="image/*"
          onFileChange={handleFileSelect}
          additionalButton={imageUrl ? (
            <Button
              variant="contained"
              color="success"
              startIcon={<Download />}
              onClick={handleDownload}
              disabled={isDownloading}
              sx={{ 
                transition: 'all 0.3s ease',
                fontWeight: 500,
              }}
            >
              Download
            </Button>
          ) : undefined}
        />

        {imageUrl && typeof imageUrl === 'string' && (
          <BrowserWindow 
            ref={browserWindowRef}
            imageUrl={imageUrl} 
            url={initialUrl}
            initialWidth={800}
          />
        )}
        
      </Box>
    </Container>
  )
}

export default App
