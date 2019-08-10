import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createTicket } from '../../API/API'

import { styles } from './TicketFormStyle'
import { Typography, Snackbar } from '@material-ui/core';

class TicketForm extends Component {

    state = {
        name: null,
        topic: null,
        comments: null,
        location: null,
        contact: null,
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    }

    cookies = this.props.cookies

    handleTicketSubmit = () => {
        this.state.name = this.cookies.get('name');
        createTicket(this.state.name, this.state.topic, this.state.comments, this.state.location, this.cookies.get('contact'), this.cookies.get('token'),
        (response) => {
            
        }, (onError) => {
            this.setState({ open: true});
        });
    }

    handleClose = event => {
        this.setState({ open: false});
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })

    }

    render() {
        const { classes } = this.props;
        const { vertical, horizontal, open } = this.state;
        return (            
        <Aux>
            <form onSubmit={this.logIn} noValidate autoComplete='off'>
                <Typography
                    variant = 'h4'
                >Hey, {this.cookies.get('name')}!</Typography>
                <Typography
                    variant = 'h4'
                >How can we help you today?</Typography>
                <TextField
                    fullWidth
                    id='topic'
                    label='I need help with:'
                    placeholder = 'Java, Python, React.js, etc'
                    margin='normal'
                    onChange={this.handleChange}
                ></TextField>
                <TextField
                    fullWidth
                    id='comments'
                    label='Describe your problem'
                    multiline
                    rowsMax = '4'
                    margin='normal'
                    onChange={this.handleChange}
                ></TextField>
                <TextField
                    fullWidth
                    id='location'
                    label='You can find me at'
                    placeholder = 'A5101, A6201, etc'
                    margin='normal'
                    onChange={this.handleChange}
                ></TextField>
                <Button 
                    fullWidth
                    variant='contained' 
                    color='primary' 
                    className={classes.button} 
                    onClick={this.handleTicketSubmit}
                    >Create ticket</Button>
            </form>
            <Snackbar
                className = {classes.snackbar}
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">There has been a problem</span>}
            />
        </Aux>
        );
    }
}

export default withStyles(styles)(TicketForm);