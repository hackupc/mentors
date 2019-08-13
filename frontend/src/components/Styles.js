const colors = {
    primary: '#f8f8f8',
    secondary: '#9CCC65',
    navBarText: '#555',
    text: 'black',
    cancel: '#FF8A65',
    backgroundPrimary: 'white',
    backgroundSecondary: '#e7e7e7',
    darkSecondary: '#33691E'
}

const globalCard = {
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: '5%',
    fontFamily: 'ProximaNovaRegular, roboto, sans-serif',
    padding: '5%',
    backgroundColor: colors.backgroundPrimary
};

const globalButton = {
    marginTop: 10,
    backgroundColor: colors.secondary,
    "&:hover": {
        backgroundColor: colors.secondary,
    },
    color: colors.text
};

const snackbar = {
    marginBottom: 20
};

export {colors, globalButton, globalCard, snackbar };