/**
 * @fileoverview Instructions card component that displays step-by-step guidance
 * for using the browser window mockup functionality.
 */

import { Card, CardContent, Typography, useTheme } from '@mui/material'

/**
 * Props for the InstructionsCard component.
 */
interface InstructionsCardProps {
  /** Text to display for the upload button in the instructions */
  buttonText?: string
}

/**
 * A card component that displays instructional guidance for the browser window
 * mockup functionality with themed styling.
 * 
 * @param props - The component props
 * @returns The InstructionsCard component
 */
function InstructionsCard({ buttonText = 'Upload File' }: InstructionsCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
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
              marginBottom: 0.5,
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
  )
}

export default InstructionsCard
