import { createMuiTheme } from '@material-ui/core/styles';

const DefaultTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans',
      'sans-serif',
    ].join(',')
  },
});

export default DefaultTheme;
