import React, { Component } from 'react';
import Aux from '../../hoc/Aux'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { styles } from './WelcomPageStyle'

class WelcomePage extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Grid container >
                <Grid item xs = {document.body.offsetWidth < 1000 ? 0 : 3} ></Grid>
                <Grid item xs = {document.body.offsetWidth < 1000 ? 12 : 6} >
                    <Card className={classes.card}>
                        <Typography 
                            variant="h4" 
                            className = {classes.text}
                            >Welcome to HackUPC mentors!</Typography>
                        <Typography 
                            variant="subtitle1" 
                            className = {classes.text}
                        >Need some help? You can submit a ticket <a href='/tickets' className={classes.link}>here</a>.</Typography>
                    </Card> 
                </Grid>
                <Grid item xs={document.body.offsetWidth < 1000 ? 0 : 3}></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(WelcomePage);