import { Box, Button, Card, CardContent, Typography } from '@mui/material'
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
  return (
     <Box>
      <Card sx={{ display: 'flex', justifyContent: 'center', mb: 2  }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
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
          sx={{ alignSelf: 'flex-start', mb: 2 }}
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