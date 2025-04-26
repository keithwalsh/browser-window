import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { ChangeEvent } from 'react'

interface FileUploaderProps {
  accept?: string
  buttonText?: string
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function FileUploader({
  accept = 'image/*',
  buttonText = 'Upload File',
  onFileChange
}: FileUploaderProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
     <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          maxWidth: '600px',
          mb: 3,
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : undefined,
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              textAlign: 'left',
              '& ol': {
                paddingLeft: 2.5,
                marginTop: 0.5,
              },
              '& li': {
                marginBottom: 0.75,
              }
            }}
          >
            <ol>
              <li>Click the "{buttonText}" button to upload an image</li>
              <li>Once uploaded, the image will appear in a browser window mockup</li>
              <li>Adjust the browser window width using the slider</li>
              <li>Click on the URL bar to edit the displayed address</li>
            </ol>
          </Typography>
        </CardContent>
      </Card>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          sx={{ 
            px: 3,
            py: 1.2,
            mb: 2,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            fontWeight: 500,
          }}
        >
          {buttonText}
          <input
            type="file"
            accept={accept}
            onChange={onFileChange}
            hidden
          />
        </Button>
    </Box>
  )
}

export default FileUploader 