import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { updateTicket } from '../../API/API';

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

class TicketDetail extends Component {

    state = {
        name: null,
        topic: null,
        comments: null,
        location: null,
        contact: null
    }

    handleSaveTicket = () => {
        updateTicket({name: this.state.name,
                        topic: this.state.topic,
                        comments: this.state.comments,
                        location: this.state.location}, 
                    this.props.cookies.get('token'),
                    this.props.cookies.get('user_id'),
        (response) => {

        }, (error) => {

        })
    }

    render() {
        const { classes } = this.props;
        let ticketInfo;
        if (this.props.cookies.get('is_hacker') === "true") {
            ticketInfo = (<div>
                <form noValidate autoComplete='off'>
                    <center>
                        <h2> Ticket Info </h2>
                        <TextField
                            id='name'
                            label='Title'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            value={this.props.ticket.name}
                        /><br/>
                        <TextField
                            id='topic'
                            label='Topic'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            value={this.props.ticket.topic}
                        /><br/>
                        <TextField
                            id='comments'
                            label='Comments'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            value={this.props.ticket.comments}
                        /><br/>
                        <TextField
                            id='location'
                            label='Location'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            value={this.props.ticket.location}
                        /><br/>
                        <TextField
                            id='contact'
                            label='Contact (slack)'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            value={this.props.ticket.contact}
                        /><br/>
                        <Button variant='contained' color='primary' className={classes.button} onClick={this.handleSaveTicket}>
                            Save ticket
                        </Button><br/><br/>
                        <Button variant="contained"> Delete </Button>
                    </center>
                </form>
            </div>)
        } else {
            ticketInfo = (
                <div>
                    <p>Title: {this.props.ticket.name}</p>
                    <p>Topic: {this.props.ticket.topic}</p>
                    <p>Comments: {this.props.ticket.comments}</p>
                    <p>Location: {this.props.ticket.location}</p>
                    <p>Slack: {this.props.ticket.contact}</p>
                    <center>
                        <Button variant="contained">Claim</Button>
                    </center>
                </div>
            )
        }
        return (
            <div>
                { ticketInfo }
            </div>
        )
    }
}

export default withStyles(styles)(TicketDetail);