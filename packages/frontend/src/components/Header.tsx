import { useState, MouseEvent } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import Logo from '../assets/OnOnetree-logo-branco.svg'
import CkChevronDown from '../assets/icons/CkChevronDown.svg'
import { Link, useLocation } from 'react-router-dom'

const pages = ['', 'Eventos', 'Locais']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const location = useLocation().pathname

  return (
    <Grid container size={12}>
      <AppBar position="static" sx={{ bgcolor: 'unset', boxShadow: 'unset' }}>
        <Toolbar disableGutters>
          <Box
            component="a"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 10 }}
          >
            <img src={Logo} alt="Logo" style={{ width: '130px' }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {page === '' ? 'Home' : page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="a"
            sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, mr: 2 }}
          >
            <img src={Logo} alt="Logo" style={{ width: '130px' }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.toLowerCase()}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'secondary.main',
                  textDecoration:
                    location === '/' + page.toLowerCase()
                      ? 'underline'
                      : 'none',
                  fontWeight: location === page.toLowerCase() ? 700 : 'inherit',
                  display: 'block',
                  textTransform: 'none',
                }}
              >
                {page === '' ? 'Home' : page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
            }}
          >
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#9ED0E6',
                  color: 'black',
                  fontSize: '1rem',
                }}
                alt="Usuário"
                src=""
              >
                TA
              </Avatar>
              <Typography sx={{ mx: 1, color: 'secondary.main' }}>
                Olá, Nome
              </Typography>
              <Tooltip title="Ver opções">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <img src={CkChevronDown} alt="Chevron Down" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Tooltip title="Ver opções">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#9ED0E6',
                      color: 'black',
                      fontSize: '1rem',
                    }}
                    alt="Usuário"
                    src=""
                  >
                    TA
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}
export default Header
