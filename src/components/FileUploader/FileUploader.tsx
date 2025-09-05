/**
 * @fileoverview File upload component with drag-and-drop interface for
 * browser window mockup functionality.
 */

import { Box, Button, Stack } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import { ChangeEvent } from 'react'
import { isImageFile } from '../../utils'
import InstructionsCard from './InstructionsCard'

/**
 * Props for the FileUploader component.
 */
interface FileUploaderProps {
  /** File types to accept (e.g., 'image/*', '.pdf', etc.) */
  accept?: string
  /** Text to display on the upload button */
  buttonText?: string
  /** Callback function triggered when a file is selected */
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  /** Optional validation function using pure utilities */
  validateFile?: (file: File) => boolean
  /** Optional additional button to display beside the upload button */
  additionalButton?: React.ReactNode
}

/**
 * A file upload component that provides an intuitive interface for selecting files
 * with themed styling.
 * 
 * @param props - The component props
 * @returns The FileUploader component
 */
function FileUploader({
  accept = 'image/*',
  buttonText = 'Select Image',
  onFileChange,
  validateFile,
  additionalButton
}: FileUploaderProps) {
  // Enhanced file change handler with optional validation
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Use validation function if provided, otherwise use default image validation
    const isValid = validateFile ? validateFile(file) : isImageFile(file);
    
    if (!isValid && accept.includes('image')) {
      console.warn('Selected file may not be a valid image');
    }

    onFileChange(event);
  };
  return (
     <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <InstructionsCard buttonText={buttonText} />
      
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          sx={{ 
            transition: 'all 0.3s ease',
            fontWeight: 500,
          }}
        >
          {buttonText}
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            hidden
          />
        </Button>
        
        {additionalButton}
      </Stack>
    </Box>
  )
}

export default FileUploader 