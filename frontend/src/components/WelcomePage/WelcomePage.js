import React, { Component } from 'react';
import Aux from '../../hoc/Aux'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 40,
        marginRight: 20,
        marginLeft: 20
    },
    card: {
        marginLeft: '7%',
        marginRight: '7%',
        marginTop: 30,
        fontFamily: 'ProximaNovaRegular, roboto, sans-serif',
        padding: 35,
    },
    link: {
        color: '#b4c959'
    },
    text: {
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'center'
    }
});

class WelcomePage extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Grid container >
                <Grid item xs = {4} ></Grid>
                <Grid item xs = {4} >
                    <Card className={classes.card}>
                        <Typography 
                            variant="h5" 
                            component="h1"
                            className = {classes.text}
                            >Welcome to HackUPC mentors!</Typography>
                        <Typography 
                            variant="h5" 
                            component="h3"
                            className = {classes.text}
                        >Need some help? You can submit a ticket <a href='/tickets' className={classes.link}>here</a>.</Typography>
                    </Card> 
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(WelcomePage);