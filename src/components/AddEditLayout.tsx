import Grid from '@mui/material/Grid2'
import CustomBreadcrumbs from './CustomBreadcrumbs'

interface AddEditLayoutProps {
  itemTipo: 'locais' | 'eventos'
}
export default function AddEditLayout({ itemTipo }: AddEditLayoutProps) {
  return (
    <Grid
      component="main"
      container
      sx={{ justifyContent: 'center' }}
      spacing={3}
      size={12}
    >
      <Grid container size={4}>
        <CustomBreadcrumbs tipo={itemTipo} />
      </Grid>
    </Grid>
  )
}
