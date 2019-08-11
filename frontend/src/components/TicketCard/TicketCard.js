import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { claimTicket, unClaimTicket, deleteTicket } from '../../API/API';
import Grid from '@material-ui/core/Grid';


import { styles } from './TicketCardStyle'
import { Typography, Snackbar } from '@material-ui/core';

class TicketCard extends Component {
    
    cookies = this.props.cookies;
    
    ticket = this.props.ticket;
    
    state = {
        claimed: this.ticket.claimer_id,
    }
    
    claim = () => {
        console.log("claiming");
        console.log(this.ticket);
        claimTicket(this.ticket, this.cookies.get('token'), this.cookies.get('user_id'), 
        (response) => {
            this.setState({claimed: this.cookies.get('user_id')});
            this.props.claimPress(this.ticket, this.cookies.get('user_id'));
        }, 
        (error) => {
            console.log(error);
        });
    }
    
    unClaim(ticket, token) {
        console.log("reopening");
        console.log(ticket);
        unClaimTicket(ticket, token, (response) => {
            this.setState({claimed: ""});            
            this.props.claimPress(ticket, "");
        }, (error) => {
            console.log(error);
        });
        
    }
    
    deleteButton(ticket, token) {
        console.log("deleting");
        console.log(ticket);
        deleteTicket(ticket, token, (response) => {
            this.props.deleteTicket(ticket);
        }, (error) => {
            console.log(error);
        });

    }

    handleChange = () => {
        this.props.handleChange(this.ticket.id);
    }
    
    render() {
        const { classes } = this.props;
        let claimButton = 
            <Button
                className = { classes.button }
                fullWidth
                onClick={this.claim}
            >Claim</Button>;
        let unClaimbutton = 
            <Button
                className = { classes.button }
                fullWidth
                onClick = {() => this.unClaim(this.ticket, this.props.cookies.get('token'))}
            >Reopen</Button>;
        let removeButton = 
            <Button
                className = { classes.removeButton }
                fullWidth
                onClick = {() => this.deleteButton(this.ticket, this.props.cookies.get('token'))}
            >Remove</Button>;
        const is_hacker = this.cookies.get('is_hacker') === 'true';
        return (
            <ExpansionPanel
                className = {this.props.color ? classes.ticket: null}
                expanded = {this.props.expanded === this.ticket.id}
                onChange = {this.handleChange}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Grid container>
                        <Grid item xs = {8} >
                            <Typography
                                variant = 'h6'
                            >{this.ticket.name}</Typography>
                            <Typography
                                variant = 'subtitle1'
                            >Needs help in: {this.ticket.topic}</Typography>
                        </Grid>
                        <Grid item xs = {4}>
                            <Typography
                                variant = 'subtitle1'
                                align = 'right'
                                className = { this.state.claimed ? (this.ticket.claimer_id == this.cookies.get('user_id') ? classes.claimedByText : classes.claimText) : classes.waitingText }
                            >{ this.state.claimed ? (this.ticket.claimer_id == this.cookies.get('user_id') ? 'Your claim' : 'Claimed') : 'On wait' }</Typography>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div
                        style = {{ width: '100%'}}
                    >
                        <Typography
                            variant = 'subtitle1'
                        ><strong>Location: </strong>{this.ticket.location}</Typography>
                        <Typography
                            variant = 'subtitle1'
                        ><strong>Slack: </strong>{this.ticket.contact}</Typography>
                        <Typography
                            variant = 'subtitle1'
                        ><strong>Description: </strong>{this.ticket.comments}</Typography>
                        {!is_hacker ?
                            (this.state.claimed ? 
                                (this.state.claimed == this.cookies.get('user_id') ? 
                                    unClaimbutton 
                                    :
                                    null)
                                :
                                claimButton)
                            :
                            null}
                        {this.cookies.get('is_admin') || this.cookies.get('user_id') == this.ticket.user_id ? 
                            removeButton 
                            : 
                            null}
                        
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}


export default withStyles(styles)(TicketCard);