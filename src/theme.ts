import { createMuiTheme, Theme } from '@material-ui/core/styles';

import { DeepPartial } from './helpers/types';

const white = '#F7F7F7';
const darkBlue = '#2D3142';
const lightBlue = '#4F5D75';
const green = '#83A0A0';

export const styledTheme = {
  white,
  darkBlue,
  lightBlue,
  green,
} as const;

const muiThemeObject: DeepPartial<Theme> = {
  typography: {
    fontFamily: 'Quicksand',
    fontWeightRegular: 400,
    fontWeightBold: 600,
    caption: {
      // @ts-ignore
      opacity: .75,
    },
  },
  palette: {
    background: {
      default: darkBlue,
      paper: lightBlue,
    },
    primary: {
      contrastText: white,
      dark: darkBlue,
      main: lightBlue,
    },
    secondary: {
      contrastText: white,
      main: green,
    },
    text: {
      primary: white,
    },
    action: {
      active: white,
    }
  }
}

export const muiTheme = createMuiTheme(muiThemeObject as Theme);