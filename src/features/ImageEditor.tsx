/**
 * @fileoverview Placeholder for Image Editor feature module demonstrating
 * route-based code splitting.
 */

import { Box, Typography } from '@mui/material'

export default function ImageEditor() {
  return (
    <Box p={3}>
      <Typography variant="h5">Image Editor Module</Typography>
      <Typography>
        This would contain image editing features like crop, resize, filters, etc.
        It's loaded only when needed, reducing initial bundle size.
      </Typography>
    </Box>
  )
}