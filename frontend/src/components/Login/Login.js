import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { login } from '../../API/API'

const styles = theme => ({
    card: {
        minWidth: 275,
        maxWidth: 300,
        margin: 16,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        width: '200px'
      },
});

class Login extends Component {
    state = {
        email: null,
        password: null,
        redirect: false
    }

    cookies = this.props.cookies

    componentDidMount() {

    }

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
            this.cookies.set('is_hacker', response.data.data.is_admin, { path: '/' });
            this.cookies.set('is_mentor', response.data.data.is_admin, { path: '/' });
            console.log(this.cookies.get('token'));
            this.setState({redirect: true})
        }, (error) => {

        });
    }

    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
            console.log('redirecting');
            return <Redirect to='/tickets'/>;
        }
        return(
            <center>
                <Card className={classes.card}>
                    <form noValidate autoComplete='off'>
                        <center>
                        <TextField
                            id='email'
                            label='Email'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                        /><br/>
                        <TextField
                            id='password'
                            label='Password'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            type='password'
                        /><br/>
                        <Button variant='contained' color='primary' className={classes.button} onClick={this.logIn}>
                            Login
                        </Button>
                        </center>
                    </form>
                </Card>
            </center>
        );
    }
}

export default withStyles(styles)(Login);