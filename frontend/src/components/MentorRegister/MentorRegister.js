import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';



import { registerMentor } from '../../API/API'
import { styles } from './MentorRegisterStyle'
import { Grid } from '@material-ui/core';

class SignUp extends Component {
    state = {
        email: null,
        name: null,
        password: null,
        contact: null,
        code: null,
        open: false,
        vertical: 'top',
        horizontal: 'center',
        registered: false,
        confirmPassword: null
    }

    cookies = this.props.cookies;

    componentDidMount() {
        console.log(this.cookies.get('name'));
    }
    
    handleClose = () => {
        this.setState({ open: false });
    };

    signUp = () => {
        registerMentor(this.state.email, this.state.name, this.state.password, this.state.contact, this.state.code,
        (response) => {
            this.setState({ open: true });
            console.log(response);
        }, (error) => {
            console.log(error);
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
        if (this.state.open) {
            return <Redirect to='/log-in'/>; 
        }
        if (this.state.redirect || this.cookies.get('user_id')) {
            console.log('redirecting');
            return <Redirect to='/tickets'/>;
        }
        return(
            <Grid container >
                <Grid item xs = {document.body.offsetWidth < 1000 ? 2 : 4} ></Grid>
                <Grid item xs = {document.body.offsetWidth < 1000 ? 8 : 4} >
                    <Card className={classes.card}>
                        <form noValidate autoComplete="off">
                            <Typography
                                variant = "h4"
                            >Mentor's Register</Typography>
                            <Typography
                                variant = "subtitle1"
                            >Welcome Mentor!! We are so thankful for your help!!</Typography>
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
                            <TextField
                                fullWidth
                                required
                                id="code"
                                label="Invitation code"
                                className={classes.textField}
                                onChange={this.handleChange}
                                margin="normal"
                            ></TextField>
                            <Button
                                fullWidth
                                variant = "contained" 
                                color = "primary" 
                                className = {classes.button} 
                                onClick = {this.signUp}
                                disabled = {!(this.state.confirmPassword === this.state.password && this.state.email &&
                                            this.state.email.includes("@") && this.state.name && this.state.password &&
                                            this.state.contact && this.state.code)}
                            >Register</Button>
                        </form>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">I love snacks</span>}
                        />
                    </Card>
                </Grid>
                <Grid item xs = {document.body.offsetWidth < 1000 ? 2 : 4} ></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SignUp);