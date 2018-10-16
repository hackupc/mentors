import React, { Component } from 'react';
import Aux from '../../hoc/Aux'

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
        minWidth: 275,
        maxWidth: 400,
        margin: 16,
    },
});

class WelcomePage extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Aux>
                <center>
                    <Card className={classes.card} elevation={1}>
                        <Typography variant="h1" component="h1">
                            Welcome to HackUPC mentors!
                        </Typography>
                        
                        <h4>Need some help? You can submit a ticket <a href='/tickets'>here.</a></h4>
                    </Card>
                    
                </center>
            </Aux>
        );
    }
}

export default withStyles(styles)(WelcomePage);