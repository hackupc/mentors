import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../components/Styles';

export const theme = createMuiTheme({
    palette: {
        primary: colors.primary,
        secondary: colors.secondary,
    },
    typography: {
        fontFamily: colors.text.font,
    },
    MuiButton: {
        marginTop: 10,
    }
  });