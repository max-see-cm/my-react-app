import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    tertiary: Palette['primary'];
    textColor: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    textColor?: PaletteOptions['primary'];
  }
}


declare module "@mui/material/styles" {
  interface TypographyVariants {
    selectedTitle: React.CSSProperties;
    tableHeader: React.CSSProperties;
    menuLink1:  React.CSSProperties;
    labelText1: React.CSSProperties;
    labelText2:React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    selectedTitle?: React.CSSProperties;
    tableHeader?: React.CSSProperties;
    menuLink1?:  React.CSSProperties;
    labelText1?:React.CSSProperties;
    labelText2?:React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    selectedTitle: true;
    tableHeader: true;
    menuLink1:  true;
    labelText1: true;
    labelText2: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary:true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides{
    tertiary:true;
  }
}