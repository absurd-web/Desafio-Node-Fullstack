import { createContext, useState, useContext, ReactNode } from 'react'
import {
  Snackbar,
  Alert,
  useTheme,
  Typography,
  SnackbarCloseReason,
} from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface SnackbarContextProps {
  showSnackbar: (
    title: string,
    message: string,
    severity?: 'success' | 'error'
  ) => void
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
)

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context)
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  return context
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  )
  const { palette } = useTheme()

  const showSnackbar = (
    title: string,
    message: string,
    severity: 'success' | 'error' = 'success'
  ) => {
    setSnackbarTitle(title)
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          icon={
            snackbarSeverity === 'success' ? (
              <CheckCircleIcon style={{ fill: palette.success.main }} />
            ) : (
              <ErrorIcon style={{ fill: palette.error.main }} />
            )
          }
          sx={{
            width: '100%',
            alignItems: 'center',
            color: 'primary.main',
            bgcolor:
              snackbarSeverity === 'success'
                ? palette.successSuport.main
                : palette.errorSuport.main,
            borderLeft: `4px solid ${snackbarSeverity === 'success' ? palette.success.main : palette.error.main}`,
          }}
        >
          <Typography
            color="inherit"
            sx={{ fontSize: '16px', fontWeight: 700 }}
          >
            {snackbarTitle}
          </Typography>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
