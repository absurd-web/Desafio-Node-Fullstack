import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'

import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

const GridLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation().pathname
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: 'flex',
        maxWidth: '1224px',
        margin: 'auto',
        bgcolor: 'black',
      }}
    >
      {children}
    </Grid>
  )
}

export default GridLayout
