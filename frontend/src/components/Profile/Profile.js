import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
      maxWidht: 400,
      padding: 8,
      margin: 16
    }
};

const profile = (props) => {
    console.log(props)
    const { classes } = props;
    return (
        <center>
            <Card className={classes.card}>
                {props.name}<br></br>
                {props.email}
            </Card>
        </center>
    );
}

export default withStyles(styles)(profile);