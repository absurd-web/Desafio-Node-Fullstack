import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource-variable/open-sans'

import Header from './components/Header.tsx'
import GridLayout from './components/GridLayout.tsx'
import Home from './routes/Home.tsx'
import Eventos from './routes/Eventos.tsx'
import Locais from './routes/Locais.tsx'
import AddEditLayout from './components/AddEditLayout.tsx'

const theme = createTheme({
  palette: {
    onPrimary: { main: '#333B49' },
    primary: { main: '#EBF0F9' },
    onSecondary: { main: '#10141D' },
    secondary: { main: '#FFFFFF' },
    onSupportBlue: { main: '#CAD6EC' },
    supportBlue: { main: '#6D99FB' },
    greyBlue: { main: '#808FA9' },
    greyBlue2: { main: '#4E4F5B' },
    attentionBackground: { main: '#2669FF' },
    grey: { 500: '#999AA1' },
    lightGrey: { main: '#BABBBF' },
    background: { default: '#333B49' },
    surface: { main: '#10141D' },
    surface2: { main: '#191E28' },
    success: { main: '#99C766' },
    warning: { main: '#F79E1B' },
    error: { main: '#CD2C19' },
    successSuport: { main: '#2F3B28' },
    warningSuport: { main: '#61461F' },
    errorSuport: { main: '#461527' },
  },
  typography: { fontFamily: 'Open Sans, sans-serif' },
  components: {
    MuiBreadcrumbs: { styleOverrides: { separator: { color: '#EBF0F9' } } },
    MuiInput: {
      styleOverrides: {
        root: {
          width: '100%',
        },
        input: {
          '& ::placeholder': { color: '#808FA9' },
          color: '#EBF0F9',
          padding: '0.8rem 1rem',
          borderRadius: '4px',
          backgroundColor: '#333B49',
        },
      },
    },
  },
})

const router = createBrowserRouter([
  {
    /* layout element */
    element: (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GridLayout>
          <Header />
          <Outlet />
        </GridLayout>
      </ThemeProvider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'eventos',
        element: <Eventos />,
      },
      {
        path: 'locais',
        element: <Locais />,
      },
      {
        path: 'eventos/add',
        element: <AddEditLayout itemTipo="eventos" />,
      },
      {
        path: 'locais/add',
        element: <AddEditLayout itemTipo="locais" />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
