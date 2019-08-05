import React, { Component } from 'react';
import { loadTickets } from '../../API/API'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TicketForm from '../../components/TicketForm/TicketForm'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from "@material-ui/core/FormGroup";
import { Typography } from '@material-ui/core';
import { styles } from './TicketsStyle'

import { claimTicket, unClaimTicket, deleteTicket } from '../../API/API';


class Tickets extends Component {
    cookies = this.props.cookies
    
    state = {
        tickets: [],
        showAll: true,
        open: false,
        editing: false,
        selectedTicket: null,
        color: false
    }
    
    claim(ticket, user_id, token) {
        console.log("claiming");
        console.log(ticket);
        claimTicket(ticket, token, user_id, (response) => {
            this.props.onClaim(response);
        }, (error) => {
            
        });
        window.location.reload();
    }
    
    unClaim(ticket, token) {
        console.log("reopening");
        console.log(ticket);
        unClaimTicket(ticket, token, (response) => {
            this.props.onClaim(response)
        }, (error) => {
    
        });
        window.location.reload();

    }
    
    deleteButton(ticket, token) {
        console.log("reopening");
        console.log(ticket);
        deleteTicket(ticket, token, (response) => {
            this.props.onClaim(response)
        }, (error) => {
    
        });
        window.location.reload();

    }

    ticketsLoadedHandler = (tickets) => {
        this.setState({tickets: tickets.data});
    }

    componentDidMount () {
        console.log("getting tickets");
        loadTickets(this.ticketsLoadedHandler, this.props.cookies.get('token'));
    }

    toggleShow = () => {
        this.state.color = false;
        let showStatus = this.state.showAll;
        this.setState({showAll: !showStatus});
    }

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleEditing = (ticket) => {
        this.setState({selectedTicket: ticket})
        this.setState({ editing: true})
    }

    handleEndEditing = () => {
        this.setState({selectedTicket: null})
        this.setState({ editing: false})
    }

    onCreateTicket = (ticket) => {
        let updatedTickets = this.state.tickets;
        updatedTickets.push(ticket);
        this.setState({tickets: updatedTickets});
        this.handleClose();
    }

    onTicketClaimed = (ticket) => {
        let updatedTickets = this.state.tickets;
        for (var i = 0; i < updatedTickets.length; i+=1) {
            if (updatedTickets[i].id == ticket.id) {
                updatedTickets[i].claimer_id = ticket.claimer_id;
            }
        }
        this.setState({tickets: updatedTickets});
    }
    
    render () {
        const { classes } = this.props;

        console.log(this.props.cookies.get('user_id'));
        let t = this.state.tickets
        .filter((ticket) => !ticket.claimer_id || !this.state.showAll)
        .map(ticket =>{
            this.state.color = !this.state.color;
                return (
                    <ExpansionPanel
                        className = {this.state.color ? classes.ticket: classes.ticket2}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Grid container>
                                <Grid item xs = {10} >
                                    <Typography
                                        variant = 'h6'
                                    >{ticket.name}</Typography>
                                    <Typography
                                        variant = 'subtitle1'
                                    >Needs help in: {ticket.topic}</Typography>
                                </Grid>
                                <Grid item xs = {2}>
                                    <Typography
                                        variant = 'subtitle1'
                                        align = 'right'
                                        className = { ticket.claimer_id ? classes.claimText : classes.waitingText }
                                    >{ticket.claimer_id ? 'Claimed' : 'On wait'}</Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div
                                style = {{ width: '100%'}}
                            >
                                <Typography
                                    variant = 'subtitle1'
                                ><strong>Location: </strong>{ticket.location}</Typography>
                                <Typography
                                    variant = 'subtitle1'
                                ><strong>Slack: </strong>{ticket.contact}</Typography>
                                <Typography
                                    variant = 'subtitle1'
                                ><strong>Description: </strong>{ticket.comments}</Typography>
                                {ticket.claimer_id ? 
                                    <div>
                                        <Button
                                            className = { classes.button }
                                            fullWidth
                                            onClick = {() => this.unClaim(ticket, this.props.cookies.get('token'))}
                                        >Reopen</Button>
                                        <Button
                                            className = { classes.removeButton }
                                            fullWidth
                                            onClick = {() => this.deleteButton(ticket, this.props.cookies.get('token'))}
                                        >Remove</Button>
                                    </div>
                                    :
                                    <Button
                                        className = { classes.button }
                                        fullWidth
                                        onClick={() => this.claim(ticket, this.props.cookies.get('user_id'), this.props.cookies.get('token'))}
                                    >Claim</Button>
                                }
                                
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            });
        

        if (!this.cookies.get('token')) {
            return (
                <Grid container >
                    <Grid item xs = {4} ></Grid>
                    <Grid item xs = {4} >
                        <Card className = {classes.card} >
                            <Typography
                                component="h1" 
                                variant="h5"
                                className = {classes.errorText}
                            >You must <a className = {classes.errorLink} href='/log-in'>log in</a> before</Typography>
                        </Card>
                    </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            )
        }

        if (this.cookies.get('is_hacker') === "true") {
            return (
                <Grid container >
                    <Grid item xs = {4} ></Grid>
                    <Grid item xs = {4} >
                        <Card className = {classes.card} >
                            <TicketForm cookies={this.cookies} onCreate={this.onCreateTicket}></TicketForm>
                        </Card>
                    </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            )
        }

        return (
            <Grid container >
                <Grid item xs = {3} ></Grid>
                <Grid item xs = {6} >
                    <Card className = {classes.card} >
                        <Grid container >
                            <Grid item xs= {10}>
                                <Typography
                                    variant = 'h4'
                                    className = { classes.title }
                                >Tickets</Typography>
                            </Grid>
                            <Grid item xs = {2} >
                                <FormGroup>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch
                                                onChange = {this.toggleShow}
                                            ></Switch>}
                                        label="Claimed"
                                        labelPlacement="start"
                                        className = { classes.switch }
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                            {t}
                        </Card>
                    </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Tickets);