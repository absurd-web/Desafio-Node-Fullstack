import Grid from '@mui/material/Grid2'
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
import { useState } from 'react'
import CustomBreadcrumbs from './CustomBreadcrumbs'
import { Link as RouterLink } from 'react-router-dom'

interface CadastrosLayoutProps {
  cadastrosTipo: 'locais' | 'eventos'
}

export default function CadastrosLayout({
  cadastrosTipo,
}: CadastrosLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const palette = useTheme().palette
  return (
    <Grid component="main" container spacing={3} size={12}>
      <Grid size={12}>
        <CustomBreadcrumbs tipo={cadastrosTipo} />
      </Grid>
      <Grid size={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h5" color="primary">
            {cadastrosTipo === 'locais' ? 'Locais' : 'Eventos'}
          </Typography>
          <Typography color="primary" sx={{ fontSize: '14px' }}>
            {cadastrosTipo === 'locais'
              ? 'Confira a lista de todo os locais cadastrados'
              : 'Confira a lista de todo os eventos cadastrados'}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder={
                cadastrosTipo === 'locais'
                  ? 'Pesquise por nome do local'
                  : 'Pesquise por nome do evento'
              }
              type="search"
              size="small"
              sx={{
                color: 'primary.main',
                '& .MuiInputBase-input::placeholder': {
                  color: palette.greyBlue.main,
                },
                '& .MuiInputBase-input': {
                  color: palette.greyBlue.main,
                  p: 0,
                },
                p: 1,
                width: '40%',
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
              component={RouterLink}
              to={`/${cadastrosTipo}/add`}
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
              {cadastrosTipo === 'locais'
                ? 'Adicionar local'
                : 'Adicionar evento'}
            </Button>
          </Box>
          <DataTable
            searchQuery={searchQuery}
            tableMode={cadastrosTipo === 'locais' ? 'local' : 'evento'}
          />
        </Container>
      </Grid>
    </Grid>
  )
}
