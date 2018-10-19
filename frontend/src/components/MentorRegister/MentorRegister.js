import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';


import { registerMentor } from '../../API/API'

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
        registered: false
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

        return(
            <center>
                <Card className={classes.card}>
                <form noValidate autoComplete="off">
                    <center>
                    <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    /><br/>
                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    /><br/>
                    <TextField
                        id="contact"
                        label="Contact (slack)"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    /><br/>
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                        type='password'
                    /><br/>
                    <TextField
                        id="code"
                        label="Invitation code"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    /><br/>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.signUp}>
                        Register
                    </Button>
                    </center>
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
            </center>
        );
    }
}

export default withStyles(styles)(SignUp);