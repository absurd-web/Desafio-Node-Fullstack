import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid2'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Button,
  Container,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material'
import CkSearch from '../assets/icons/CkSearch.svg?react'
import '../styles/CadastrosLayout.css'
import DataTable from './DataTable'

export default function CadastrosLayout() {
  const palette = useTheme().palette
  return (
    <Grid component="main" container spacing={3} size={12}>
      <Grid size={12}>
        <Breadcrumbs aria-label="breadcrumb" style={{ color: 'primary' }}>
          <Link underline="hover" color="primary" href="/">
            Home
          </Link>
          <Link
            underline="hover"
            color={palette.supportBlue.main}
            href="/material-ui/react-breadcrumbs/"
            aria-current="page"
          >
            Locais
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid size={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h5" color="primary">
            Locais
          </Typography>
          <Typography color="primary" sx={{ fontSize: '14px' }}>
            Confira a lista de todo os locais cadastrados
          </Typography>
        </Box>
      </Grid>
      <Grid
        sx={{ bgcolor: palette.surface.main, borderRadius: '20px' }}
        size={12}
      >
        <Container
          sx={{ display: 'flex', flexDirection: 'column', padding: 4, gap: 3 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              placeholder="Pesquise por nome do local"
              type="search"
              size="small"
              sx={{
                color: 'primary.main',
                '& .MuiInputBase-input::placeholder': {
                  color: palette.greyBlue.main,
                },
                width: '40%',
                py: 0,
                px: 1,
                borderRadius: '4px',
                bgcolor: 'background.default',
              }}
              startAdornment={
                <InputAdornment position="start">
                  <CkSearch className="icon-search" width={16} height={16} />
                </InputAdornment>
              }
            />
            <Button
              variant="contained"
              disableElevation
              sx={{
                textalign: 'center',
                bgcolor: 'primary.main',
                color: palette.onSecondary.main,
                fontWeight: '600',
                textTransform: 'none',
                textWrap: 'nowrap',
                maxHeight: '40px',
              }}
            >
              Adicionar local
            </Button>
          </Box>
          <DataTable tableMode="local" />
        </Container>
      </Grid>
    </Grid>
  )
}
