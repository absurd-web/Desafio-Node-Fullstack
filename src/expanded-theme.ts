declare module '@mui/material/styles' {
  interface Palette {
    onPrimary: Palette['primary']
    onSecondary: Palette['secondary']
    onSupportBlue: Palette['primary']
    supportBlue: Palette['primary']
    greyBlue: Palette['primary']
    greyBlue2: Palette['primary']
    attentionBackground: Palette['primary']
    lightGrey: Palette['primary']
    surface: Palette['primary']
    surface2: Palette['primary']
    successSuport: Palette['primary']
    warningSuport: Palette['primary']
    errorSuport: Palette['primary']
  }

  interface PaletteOptions {
    onPrimary?: PaletteOptions['primary']
    onSecondary?: PaletteOptions['secondary']
    onSupportBlue?: PaletteOptions['primary']
    supportBlue?: PaletteOptions['primary']
    greyBlue?: PaletteOptions['primary']
    greyBlue2?: PaletteOptions['primary']
    lightGrey?: PaletteOptions['primary']
    surface?: PaletteOptions['primary']
    surface2?: PaletteOptions['primary']
    attentionBackground?: PaletteOptions['primary']
    successSuport?: PaletteOptions['primary']
    warningSuport?: PaletteOptions['primary']
    errorSuport?: PaletteOptions['primary']
  }
}
