import { colors, globalCard, globalButton, snackbar } from '../Styles'
export { styles }

const styles = {
    card: globalCard,
    button: globalButton,
    snackbar: snackbar,
    cancelButton: {
        marginTop: 10,
        backgroundColor: colors.cancel,
        "&:hover": {
            backgroundColor: colors.cancel,
        }
    },
    text: {
        marginTop: 5,
        marginBottom: 5
    }
};