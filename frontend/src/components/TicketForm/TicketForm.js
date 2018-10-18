import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createTicket } from '../../API/API'


const styles = theme => ({
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
        width: '200px',
        backgroundColor: '#d13f5a',
        "&:hover": {
            backgroundColor: "#d13f5a"
        }
      },
});

class TicketForm extends Component {

    state = {
        name: null,
        topic: null,
        comments: null,
        location: null,
        contact: null
    }

    cookies = this.props.cookies

    handleTicketSubmit = () => {
        createTicket(this.state.name, this.state.topic, this.state.comments, this.state.location, this.state.contact, this.cookies.get('token'),
        (response) => {
            this.props.onCreate(response.data.data);
        }, (onError) => {

        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (            
        <Aux>
            <form onSubmit={this.logIn} noValidate autoComplete='off'>
                <center>
                <TextField
                    id='name'
                    label='Title'
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleChange}
                /><br/>
                <TextField
                    id='topic'
                    label='Topic'
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleChange}
                /><br/>
                <TextField
                    id='comments'
                    label='Comments'
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleChange}
                /><br/>
                <TextField
                    id='location'
                    label='Location'
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleChange}
                /><br/>
                <TextField
                    id='contact'
                    label='Contact (slack)'
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleChange}
                /><br/>
                <Button variant='contained' color='primary' className={classes.button} onClick={this.handleTicketSubmit}>
                    Create ticket
                </Button>
                </center>
            </form>
        </Aux>
        );
    }
}

export default withStyles(styles)(TicketForm);