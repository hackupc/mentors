import { globalCard, globalButton, colors } from '../../components/Styles';


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
    errorText: {
        textAlign: 'center',
        fontWeight: 'normal'
    },
    errorLink: {
        color: colors.secondary,

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
    title: {
        marginBottom: '1%'
    },
    
});