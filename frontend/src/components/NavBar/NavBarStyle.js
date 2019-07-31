import { colors } from '../Styles'
export { styles }

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    grow: {
        flexGrow: 1,
    },
    navBarLink: {
        fontFamily: "ProximaNovaRegular, 'Roboto', sans-serif",
        padding: 23,
        color: colors.navBarText,
        opacity : 0.8,
        '&:hover': {
            opacity : 1,
            backgroundColor: colors.backgroundSecundary
        }
    },
    navBarLinkActive: {
        opacity: 1,
        backgroundColor: colors.backgroundSecundary
    },
    navBarTitle: {
        color: colors.navBarText
    },
    navBarStyle: {
        backgroundColor: colors.primary
    },
    avatar: {
        backgroundColor: colors.secundary,
        marginLeft: 10,
        cursor: 'pointer'
    },
    menu: {
        marginTop:40
    },
    menuItem: {
        '&:focus' : {
            backgroundColor: 'white'
        },
        '&:hover': {
            backgroundColor: colors.backgroundSecundary
        }
    }
})