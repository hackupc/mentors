import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import { login } from '../../API/API'

import { styles } from './LoginStyle'

class Login extends Component {
    state = {
        email: null,
        password: null,
        redirect: false,
        vertical: 'bottom',
        horizontal: 'center',
        open: false
    }

    cookies = this.props.cookies

    componentDidMount() {

    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    logIn = () => {
        console.log('loging in');
        login(this.state.email, this.state.password, (response) => {
            console.log(response.data);
            this.cookies.set('token', response.data.data.token, { path: '/' });
            this.cookies.set('email', response.data.data.email, { path: '/' });
            this.cookies.set('name', response.data.data.name, { path: '/' });
            this.cookies.set('user_id', response.data.data.user_id, { path: '/' });
            this.cookies.set('contact', response.data.data.contact, { path: '/' });
            this.cookies.set('is_admin', response.data.data.is_admin, { path: '/' });
            this.cookies.set('is_hacker', response.data.data.is_hacker, { path: '/' });
            this.cookies.set('is_mentor', response.data.data.is_mentor, { path: '/' });
            console.log(this.cookies.get('token'));
            this.setState({redirect: true})
        }, (error) => {
            console.log(error);
            this.setState({ open: true , password: ''});
        });
    }
    
    render() {
        const { classes } = this.props;
        const { vertical, horizontal, open } = this.state;
        if (this.state.redirect || this.cookies.get('user_id')) {
            console.log('redirecting');
            return <Redirect to='/tickets'/>;
        }
        return(
            <Grid container >
                <Grid item xs = {4} ></Grid>
                <Grid item xs = {4} >
                    <Card className = {classes.card} >
                        <form noValidate>
                            <Typography 
                                variant="h4"
                            >Log in</Typography>
                            <TextField
                                id='email'
                                label='Email'
                                margin='normal'
                                onChange={this.handleChange}
                                required
                                fullWidth
                                name="email"
                                autoFocus
                                value = {this.state.email}
                                error = {this.state.email && !this.state.email.includes("@")}
                                helperText = {this.state.email && !this.state.email.includes("@") ? 'Email is not valid' : ''}
                            ></TextField>
                            <TextField
                                id='password'
                                label='Password'
                                margin='normal'
                                onChange={this.handleChange}
                                type='password'
                                required
                                fullWidth
                                name='password'
                                value={this.state.password}
                            ></TextField>
                            <Button 
                                fullWidth
                                variant='contained'  
                                className={classes.button} 
                                onClick={this.logIn}
                                disabled = {!(this.state.email && this.state.email.includes("@") && this.state.password)}
                            >Log in</Button>
                            <Button 
                                fullWidth
                                variant='contained' 
                                className={classes.button} 
                                href = '/sign-up'
                            >Sign up</Button>
                        </form>
                        <Snackbar
                            className={classes.snackbar}
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Your email or password are wrong. Please try again.</span>}
                        ></Snackbar>
                    </Card>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);