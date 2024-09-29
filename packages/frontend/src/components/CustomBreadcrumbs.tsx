import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import useTheme from '@mui/material/styles/useTheme'

export default function CustomBreadcrumbs({
  tipo,
}: {
  tipo: 'locais' | 'eventos'
}) {
  const palette = useTheme().palette
  return (
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
        {tipo === 'locais' ? 'Locais' : 'Eventos'}
      </Link>
    </Breadcrumbs>
  )
}
