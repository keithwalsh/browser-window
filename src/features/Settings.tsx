/**
 * @fileoverview Placeholder for Settings feature module demonstrating
 * route-based code splitting.
 */

import { Box, Typography } from '@mui/material'

export default function Settings() {
  return (
    <Box p={3}>
      <Typography variant="h5">Settings Module</Typography>
      <Typography>
        This would contain app settings and preferences.
        Separated into its own chunk for better code organization.
      </Typography>
    </Box>
  )
}