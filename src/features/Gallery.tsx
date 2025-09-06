/**
 * @fileoverview Placeholder for Gallery feature module demonstrating
 * route-based code splitting.
 */

import { Box, Typography } from '@mui/material'

export default function Gallery() {
  return (
    <Box p={3}>
      <Typography variant="h5">Gallery Module</Typography>
      <Typography>
        This would contain a gallery view for multiple images.
        Loaded on demand to improve performance.
      </Typography>
    </Box>
  )
}