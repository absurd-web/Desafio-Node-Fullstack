import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import useTheme from '@mui/material/styles/useTheme'
import { Link as RouterLink } from 'react-router-dom'

export default function CustomBreadcrumbs({
  tipo,
}: {
  tipo: 'locais' | 'eventos'
}) {
  const palette = useTheme().palette
  return (
    <Breadcrumbs aria-label="breadcrumb" style={{ color: 'primary' }}>
      <Link component={RouterLink} to="/" underline="hover" color="primary">
        Home
      </Link>
      <Link
        component={RouterLink}
        to={tipo === 'locais' ? '/locais' : '/eventos'}
        underline="hover"
        color={palette.supportBlue.main}
        aria-current="page"
      >
        {tipo === 'locais' ? 'Locais' : 'Eventos'}
      </Link>
    </Breadcrumbs>
  )
}
