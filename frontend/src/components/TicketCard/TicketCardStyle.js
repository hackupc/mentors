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
        background: colors.backgroundSecondary
    },
    claimText: {
        color : colors.cancel
    },
    waitingText: {
        color: colors.secondary
    },
    claimedByText: {
        color: colors.darkSecondary
    }
});