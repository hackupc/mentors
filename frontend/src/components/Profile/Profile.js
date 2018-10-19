import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        maxWidth: 400,
        padding: 16,
        margin: 16
    }
};

const profile = (props) => {
    function logOut() {
        props.cookies.remove("token");
        props.cookies.remove("email");
        props.cookies.remove("name");
        props.cookies.remove("user_id");
        props.cookies.remove("contact");
        window.location = "/";
    }

    console.log(props)
    const { classes } = props;
    return (
        <center>
            <Card className={classes.card}>
                Name: {props.name}<br/>
                Email: {props.email}<br/>
                Contact: {props.cookies.get('contact')}
            </Card>
            <Button variant="contained" onClick={logOut}>Log out</Button>
        </center>
    );
}

export default withStyles(styles)(profile);