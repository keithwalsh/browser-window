import { Button, Typography, Box } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ChangeEvent } from 'react'

interface FileUploaderProps {
  accept?: string
  title?: string
  buttonText?: string
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function FileUploader({
  accept = 'image/*',
  title = 'File Uploader',
  buttonText = 'Upload File',
  onFileChange
}: FileUploaderProps) {
  return (
     <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'left' }}>
          <ol>
            <li>Click the "{buttonText}" button to upload an image</li>
            <li>Once uploaded, the image will appear in a browser window mockup</li>
            <li>Adjust the browser window width using the slider</li>
            <li>Click on the URL bar to edit the displayed address</li>
          </ol>
        </Typography>
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Box>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ alignSelf: 'flex-start' }}
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
    </div>
  )
}

export default FileUploader 