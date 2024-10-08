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
import { SnackbarProvider } from './contexts/SnackbarContext.tsx'
import { getLocal, getLocais } from './api/locais.ts'
import { getEvento, getEventos } from './api/eventos.ts'
import type { LoaderFunctionArgs } from 'react-router-dom'
import EventoForm from './components/EventoForm.tsx'
import LocalForm from './components/LocalForm.tsx'

async function allItemsLoader() {
  const locais = await getLocais()
  const eventos = await getEventos()
  return { locais, eventos }
}

async function getLocalLoader({ params }: LoaderFunctionArgs) {
  const item = await getLocal(Number(params.id))
  return item
}

async function getEventoLoader({ params }: LoaderFunctionArgs) {
  const item = await getEvento(Number(params.id))
  return item
}

const theme = createTheme({
  palette: {
    onPrimary: { main: '#333B49' },
    primary: { main: '#EBF0F9' },
    onSecondary: { main: '#10141D' },
    secondary: { main: '#FFFFFF' },
    onSupportBlue: { main: '#CAD6EC' },
    supportBlue: { main: '#6D99FB' },
    skyBlue: { main: '#9ED0E6' },
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
    error: { main: '#F6285F' },
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
          backgroundColor: '#333B49',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          '&.Mui-error': {
            border: '1px solid #F6285F',
            '&:before': { borderBottom: 'unset' },
          },
        },
        input: {
          '::placeholder': { color: '#808FA9', opacity: 1 },
          color: '#EBF0F9',
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
        <SnackbarProvider>
          <GridLayout>
            <Header />
            <Outlet />
          </GridLayout>
        </SnackbarProvider>
      </ThemeProvider>
    ),
    id: 'root',
    loader: allItemsLoader,
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
        element: <EventoForm />,
      },
      {
        path: 'locais/add',
        element: <LocalForm />,
      },
      {
        path: 'eventos/edit/:id',
        element: <EventoForm />,
        loader: getEventoLoader,
      },
      {
        path: 'locais/edit/:id',
        element: <LocalForm />,
        loader: getLocalLoader,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
