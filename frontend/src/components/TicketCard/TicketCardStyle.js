import { globalCard, globalButton, colors } from '../Styles'
export { styles }


const styles = theme => ({
    button: globalButton,
    ticket: {
        background: colors.background.dark
    },
    claimText: {
        color : colors.secondary.main
    },
    waitingText: {
        color: colors.primary.dark
    },
    claimedByText: {
        color: colors.primary.dark
    }
});