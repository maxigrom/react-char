import { createMuiTheme } from '@material-ui/core/styles';

const SPACE_UNIT = 8;

const DefaultTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans',
      'sans-serif',
    ].join(',')
  },
  spacing: {
    unit: SPACE_UNIT,
    xs: SPACE_UNIT * 1,
    sm: SPACE_UNIT * 2,
    md: SPACE_UNIT * 4,
    lg: SPACE_UNIT * 8,
  }
});

export default DefaultTheme;
