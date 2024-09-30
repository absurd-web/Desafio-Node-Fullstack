import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'

import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import Background from '../assets/home_background.jpeg'
import { useTheme } from '@mui/material/styles'

const GridLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation().pathname
  const palette = useTheme().palette
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: palette.surface2.main,
        backgroundImage: location === '/' ? `url("${Background}")` : '',
        backgroundSize: '150%',
        backgroundPosition: 'top right',
        minHeight: '100vh',
      }}
    >
      {/* Overlay */}
      {location === '/' && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        />
      )}
      <Grid
        container
        spacing={3}
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          maxWidth: '1224px',
          margin: 'auto',
        }}
      >
        {children}
      </Grid>
    </Box>
  )
}

export default GridLayout
