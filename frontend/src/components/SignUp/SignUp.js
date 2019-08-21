import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';


import { register } from '../../API/API'
import { Typography } from '@material-ui/core';

import { styles } from './SignUpStyle'

class SignUp extends Component {
    state = {
        email: null,
        name: null,
        password: null,
        confirmPassword: null,
        contact: null,
        open: false,
        registered: false,
        vertical: 'bottom',
        horizontal: 'center',
        snackbarMsm: ''
    }

    cookies = this.props.cookies;

    componentDidMount() {
        console.log(this.cookies.get('name'));
    }
    
    handleClose = () => {
        this.setState({ open: false });
    };

    signUp = () => {
        register(this.state.email, this.state.name, this.state.password, this.state.contact,
        (response) => {
            this.setState({ registered: true });
            console.log(response);
        }, (error) => {
            console.log(error);
            this.setState({ open: true });
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { vertical, horizontal, open } = this.state;

        if (this.state.registered) {
            return <Redirect to='/log-in'/>;
        }
        if (this.cookies.get('user_id')) {
            console.log('redirecting');
            return <Redirect to='/tickets'/>;
        }
        return(
            <Grid container >
                <Grid item xs = {4} ></Grid>
                <Grid item xs = {4} >
                    <Card className={classes.card}>
                        <form noValidate autoComplete="off">
                            <Typography
                                variant = "h4"
                            >Sign Up</Typography>
                            <TextField
                                autoFocus
                                fullWidth
                                id = "name"
                                label = "Name"
                                onChange = {this.handleChange}
                                margin = "normal"
                                required
                            ></TextField>
                            <TextField
                                autoComplete = 'email'
                                fullWidth
                                id = "email"
                                label = "Email"
                                onChange = {this.handleChange}
                                margin = "normal"
                                required
                                value = {this.state.email}
                                error = {this.state.email && !this.state.email.includes("@")}
                                helperText = {this.state.email && !this.state.email.includes("@") ? 'Email is not valid' : ''}
                                ></TextField>
                            <TextField
                                fullWidth
                                id = "contact"
                                label = "Contact (slack)"
                                onChange = {this.handleChange}
                                margin = "normal"
                                required
                                ></TextField>
                            <TextField
                                fullWidth
                                id = "password"
                                label = "Password"
                                onChange = {this.handleChange}
                                margin = "normal"
                                type = 'password'
                                required
                                value = {this.state.password}
                                ></TextField>
                            <TextField
                                fullWidth
                                id = "confirmPassword"
                                label = "Confirm Password"
                                onChange = {this.handleChange}
                                margin = "normal"
                                type = 'password'
                                required
                                value = {this.state.confirmPassword}
                                error = {this.state.confirmPassword !== this.state.password}
                                helperText = {this.state.confirmPassword !== this.state.password ? 'Passwords are not the same' : ''}
                            ></TextField>
                            <Button
                                fullWidth
                                variant = "contained" 
                                color = "primary" 
                                className = {classes.button} 
                                onClick = {this.signUp}
                                disabled = {!(this.state.confirmPassword === this.state.password && this.state.email &&
                                            this.state.email.includes("@") && this.state.name && this.state.password &&
                                            this.state.contact)}
                            >Sign Up</Button>
                        </form>
                        <Snackbar
                            className = {classes.snackbar}
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">There has been a problem. Please try again.</span>}
                        />
                    </Card>
            </Grid>
            <Grid item xs = {4} ></Grid>
        </Grid>
        );
    }
}

export default withStyles(styles)(SignUp);