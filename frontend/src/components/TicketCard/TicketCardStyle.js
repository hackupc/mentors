import { globalCard, globalButton, colors } from '../Styles'
export { styles }


const styles = theme => ({
    button: globalButton,
    removeButton: {
        marginTop: 10,
        backgroundColor: colors.cancel,
        "&:hover": {
            backgroundColor: colors.cancel,
        },
        color: colors.text
    },
    ticket: {
        background: colors.backgroundSecundary
    },
    claimText: {
        color : colors.cancel
    },
    waitingText: {
        color: colors.secundary
    },
    claimedByText: {
        color: colors.darkSecundary
    }
});