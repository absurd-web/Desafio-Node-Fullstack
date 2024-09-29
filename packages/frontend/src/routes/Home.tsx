import Grid from '@mui/material/Grid2'

import Mascote from '../assets/corpo_todo.png'
import MdFestival from '../assets/icons/MdFestival.svg'
import MdLocalActivity from '../assets/icons/MdLocalActivity.svg'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { Palette, useTheme } from '@mui/material/styles'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import DataTable from '../components/DataTable'

interface HomeCardProps {
  backgroundColor: string
  icon: string
  title: string
  description: string
  buttonText: string
  onButtonClick: () => void
  palette: Palette
}

interface HomeTableWidgetProps {
  tableMode: 'local' | 'evento'
  title: string
  linkTo: string
  palette: Palette
}

const HomeTableWidget: React.FC<HomeTableWidgetProps> = ({
  tableMode,
  title,
  linkTo,
  palette,
}) => {
  return (
    <Grid sx={{ bgcolor: palette.surface.main, borderRadius: '20px' }} size={6}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          pt: 4,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          <Link
            component={RouterLink}
            to={linkTo}
            sx={{
              color: palette.supportBlue.main,
              textDecorationColor: palette.supportBlue.main,
            }}
          >
            Ver todos
          </Link>
        </Box>
        <DataTable tableMode={tableMode} simple />
      </Container>
    </Grid>
  )
}
const HomeCard: React.FC<HomeCardProps> = ({
  backgroundColor,
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  palette,
}) => {
  return (
    <Grid sx={{ bgcolor: backgroundColor, borderRadius: '16px' }} size={6}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 3,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <img src={icon} alt={title} />
            <Typography variant="h5" color="primary" sx={{ fontSize: '28px' }}>
              {title}
            </Typography>
          </Box>
          <Typography color="primary" sx={{ fontSize: '16px' }}>
            {description}
          </Typography>
        </Box>
        <Button
          variant="contained"
          disableElevation
          onClick={onButtonClick}
          sx={{
            bgcolor: palette.onSupportBlue.main,
            color: palette.onSecondary.main,
            fontWeight: '600',
            textTransform: 'none',
            maxHeight: '40px',
          }}
        >
          {buttonText}
        </Button>
      </Container>
    </Grid>
  )
}
function Home() {
  const theme = useTheme()
  const palette = theme.palette
  return (
    <Grid component="main" container spacing={3} size={12}>
      <Grid size={12}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={Mascote} alt="Mascote" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h4" color="primary">
              Olá, Mariana
            </Typography>
            <Typography color="primary" sx={{ fontSize: '14px' }}>
              Confira todos os seus eventos e locais em um só lugar!
            </Typography>
          </Box>
        </Box>
      </Grid>
      <HomeCard
        backgroundColor={palette.successSuport.main}
        icon={MdFestival}
        title="Locais"
        description="Confira todo os locais cadastrados!"
        buttonText="Conferir locais"
        onButtonClick={() => console.log('Locais button clicked')}
        palette={palette}
      />
      <HomeCard
        backgroundColor={palette.errorSuport.main}
        icon={MdLocalActivity}
        title="Eventos"
        description="Confira todo os eventos cadastrados!"
        buttonText="Conferir eventos"
        onButtonClick={() => console.log('Eventos button clicked')}
        palette={palette}
      />
      <HomeTableWidget
        tableMode="local"
        title="Ultimos locais adicionados"
        linkTo="/locais"
        palette={palette}
      />
      <HomeTableWidget
        tableMode="evento"
        title="Ultimos Eventos adicionados"
        linkTo="/eventos"
        palette={palette}
      />
    </Grid>
  )
}

export default Home
