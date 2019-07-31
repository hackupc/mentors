export {colors, globalButton, globalCard, titleCard, snackbar };

const colors = {
    primary: '#f8f8f8',
    secundary: '#b4c959',
    navBarText: '#555',
    text: 'black',
    cancel: '#FF8A65',
    backgroundPrimary: 'white',
    backgroundSecundary: '#e7e7e7'
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
    backgroundColor: colors.secundary,
    "&:hover": {
        backgroundColor: colors.secundary,
    },
    color: colors.text
};

const titleCard = {
    textAlign: 'Left',
    fontWeight: 'normal'
};

const snackbar = {
    marginBottom: 20
};