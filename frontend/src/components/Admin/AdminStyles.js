import { colors, globalCard, globalButton, titleCard } from '../Styles'
export {styles}

const styles = theme => ({
    button: globalButton,
    paper: {
        marginLeft: '7%',
        marginRight: '7%',
        marginTop: '15%',
        backgroundColor: colors.backgroundPrimary,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    card: globalCard,
    tableHead: {
        color: colors.text,
        fontSize: '1rem',
        paddingLeft: 0,
        fontFamily: 'ProximaNovaRegular, roboto, sans-serif',
    },
    tableBody: {
        color: colors.text,
        fontSize: '1rem',
        paddingLeft: 0,
        fontFamily: 'ProximaNovaRegular, roboto, sans-serif',
    },
    rowPair: {
        backgroundColor: colors.backgroundPrimary,
    },
    rowNonPair: {
        backgroundColor: colors.backgroundSecundary,
    },
    table: {
        width: '100%'
    }
});