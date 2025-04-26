import { useState, useCallback } from 'react'
import { Typography, Box, Container } from '@mui/material'
import BrowserWindow from './components/BrowserWindow'
import FileUploader from './components/FileUploader'
import './App.css'

function App() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const initialUrl = 'http://localhost:3000'

  // Handler for file selection
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // For the browser preview (local processing)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Browser Window Image Preview
        </Typography>
        
        <FileUploader
            buttonText="Select Image"
            accept="image/*"
            onFileChange={handleFileSelect}
          />
        
        {imageUrl && (
          <BrowserWindow 
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
