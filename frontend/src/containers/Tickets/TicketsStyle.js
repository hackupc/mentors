import { globalCard, globalButton, colors } from '../../components/Styles';
import { createMuiTheme } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import grey from '@material-ui/core/colors/grey';



const styles = theme => ({
    button: globalButton,
    card: globalCard,
    errorText: {
        textAlign: 'center',
        fontWeight: 'normal'
    },
    errorLink: {
        color: colors.primary.dark,
    },
    title: {
        marginBottom: '1%'
    },
    
});


    
  export { styles }