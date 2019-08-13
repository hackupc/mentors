import { colors, globalCard, globalButton, titleCard } from '../Styles'
export {styles}

const styles = theme => ({
    button: globalButton,
    paper: {
        marginLeft: '7%',
        marginRight: '7%',
        marginTop: '15%',
        backgroundColor: colors.background.light,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    card: globalCard,
    tableHead: {
        color: colors.text.tableTitle,
        fontFamily: colors.text.font,
        fontSize: '1rem',
        paddingLeft: 0,
    },
    tableBody: {
        fontFamily: colors.text.font,
        fontSize: '1rem',
        paddingLeft: 0,
    },
    rowPair: {
        backgroundColor: colors.background.light,
    },
    rowNonPair: {
        backgroundColor: colors.background.dark,
    },
    table: {
        width: '100%'
    }
});