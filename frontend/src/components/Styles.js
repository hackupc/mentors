// Hi developer :), use this link to reset the color values please:
// https://material.io/resources/color/#!/?view.left=0&view.right=0
// If doesn't work search material-ui color at google
// Have a great day :D

const colors = {
    primary: {
        light: '#cfff95',
        main: '#9ccc65',        
        dark: '#6b9b37',        //same 1
        contrastText: '#000',
    },
    secondary: {                //Colors for remove button, etc
        light: '#ffa270',
        main: '#ff7043',
        dark: '#c63f17',        //same 2
        contrastText: '#000',
    },
    background: {
        light: '#ffffff',
        main: '#f5f5f5',
        dark: '#e0e0e0',
        contrastText: '#000',
    },
    text: {
        navBar: '#555',
        tableTitle: '#000',
        font: "ProximaNovaRegular, 'Roboto', sans-serif",
        active: '#6b9b37',      //same 1
        yours: '#005005',
        cancel: '#c63f17'       //same 2
    }

}

const globalCard = {
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: '5%',
    padding: '5%',
    backgroundColor: colors.background.light
};

const globalButton = {
    marginTop: 10,
};

const snackbar = {
    marginBottom: 20
};

export {colors, globalButton, globalCard, snackbar };