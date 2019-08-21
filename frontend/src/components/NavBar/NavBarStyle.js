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
        fontFamily: colors.text.font,
        padding: 23,
        color: colors.text.navBar,
        opacity : 0.8,
        '&:hover': {
            opacity : 1,
            backgroundColor: colors.background.dark
        }
    },
    navBarLinkActive: {
        opacity: 1,
        backgroundColor: colors.background.dark
    },
    navBarTitle: {
        color: colors.text.navBar
    },
    navBarStyle: {
        backgroundColor: colors.background.main
    },
    avatar: {
        backgroundColor: colors.primary.main,
        marginLeft: 10,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: colors.primary.dark
        }
    },
    menu: {
        marginTop:40
    },
    menuItem: {
        '&:focus' : {
            backgroundColor: 'white'
        },
        '&:hover': {
            backgroundColor: colors.background.dark
        }
    }
})