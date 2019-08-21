import { globalCard, globalButton, colors } from '../Styles'
export { styles }


const styles = theme => ({
    button: globalButton,
    ticket: {
        background: colors.background.dark
    },
    claimText: {
        color : colors.text.cancel
    },
    waitingText: {
        color: colors.text.active
    },
    claimedByText: {
        color: colors.text.yours
    }
});