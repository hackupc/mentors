import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fffff',
            main: '#f5f5f5',
            dark: 'c2c2c2',
            contrastText: '#000',
        },
        secondary: {
            light: '#cfff95',
            main: '#9ccc65',
            dark: '#6b9b37',
            contrastText: '#000',
        },
    },
    status: {
        danger: {
            light: '#ffa270',
            main: '#ff7043',
            dark: '#c63f17',
            contrastText: '#000',
        }
    }
  });