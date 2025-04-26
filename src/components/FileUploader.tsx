import { Button, Typography, Box, Paper } from '@mui/material'
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
    <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%', maxWidth: '600px' }}>
      <Typography variant="h6" gutterBottom>
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
    </Paper>
  )
}

export default FileUploader 