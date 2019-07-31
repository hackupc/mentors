import { globalButton, titleCard, snackbar } from '../Styles'
export { styles }

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: globalButton,
    title: titleCard,
    snackbar: snackbar
});