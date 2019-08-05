import { globalCard, globalButton, colors } from '../../components/Styles'
export { styles }


const styles = theme => ({
    button: globalButton,
    card: globalCard,
    removeButton: {
        marginTop: 10,
        backgroundColor: colors.cancel,
        "&:hover": {
            backgroundColor: colors.cancel,
        },
        color: colors.text
    },
    card: globalCard,
    errorText: {
        textAlign: 'center',
        fontWeight: 'normal'
    },
    errorLink: {
        color: colors.secundary,

    },
    switch: {
        fontWeight: 1
    },
    ticket: {
        background: colors.backgroundSecundary
    },
    claimText: {
        color : colors.cancel
    },
    waitingText: {
        color: colors.secundary
    }
});