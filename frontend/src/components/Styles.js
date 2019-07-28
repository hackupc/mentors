export { styles };



const styles = theme => ({
    card: {
        marginLeft: '7%',
        marginRight: '7%',
        marginTop: 30,
        fontFamily: 'ProximaNovaRegular, roboto, sans-serif',
        padding: 35,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#b4c959',
        "&:hover": {
            backgroundColor: '#b4c959',
        }
    },
    snackbar: {
        marginBottom: 20
    },
    title: {
        textAlign: 'Left',
        fontWeight: 'normal'
    },
    root: {
        flexGrow: 1,
      },
    grow: {
        flexGrow: 1,
    },
    navBarLink: {
        fontFamily: "ProximaNovaRegular, 'Roboto', sans-serif",
        padding: 23,
        color: '#555',
        opacity : 0.8,
        '&:hover': {
            opacity : 1,
            backgroundColor: '#e7e7e7'
        }
    },
    navBarLinkActive: {
        opacity: 1,
        backgroundColor: '#e7e7e7'
    },
    navBarTitle: {
        color: '#555'
    },
    navBarStyle: {
        backgroundColor: '#f8f8f8'
    }
});