import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'

import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import Background from '../assets/home_background.jpeg'

const GridLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation().pathname
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: location === '/' ? `url("${Background}")` : 'black',
        backgroundSize: '150%',
        backgroundPosition: 'top right',
        minHeight: '100vh',
      }}
    >
      {/* Overlay */}
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
