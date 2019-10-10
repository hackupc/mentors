import React, { Component } from 'react';
import { loadTickets } from '../../API/API'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TicketForm from '../../components/TicketForm/TicketForm';
import TicketCard from '../../components/TicketCard/TicketCard';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from "@material-ui/core/FormGroup";
import { Typography } from '@material-ui/core';
import { styles} from './TicketsStyle';
import Switch from '@material-ui/core/Switch';

class Tickets extends Component {
    cookies = this.props.cookies
    
    state = {
        tickets: [],
        showAll: true,
        color: false,
        expanded: null
    }


    ticketsLoadedHandler = (tickets) => {
        this.setState({tickets: tickets.data});
    }
    
    claimPress = (ticket, user_id) => {
        let updatedTickets = this.state.tickets.splice(0, this.state.tickets.length);        
        let found = false;
        for (let i = 0; i < updatedTickets.length && !found; i++) {
            if (updatedTickets[i].id === ticket.id) {
                updatedTickets[i].claimer_id = user_id;
                found = true;
            }
        }
        this.setState({tickets: updatedTickets, color: false});
    }

    deleteTicket = (ticket) => {
        let updatedTickets = this.state.tickets.filter((t) => t.id != ticket.id)
        this.setState({tickets: updatedTickets, color: false});
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

    handleChange = (panelId) => {
        if (this.state.expanded !== panelId) {
            this.setState({expanded: panelId, color: false});
        } else {
            this.setState({expanded: null, color: false});            
        }
    }

    createTicket = (ticket) => {
        let updatedTickets = this.state.tickets.splice(0, this.state.tickets.length);
        updatedTickets.push(ticket);
        console.log(updatedTickets);
        this.setState({tickets: updatedTickets, color: false});
    }
    
    render () {
        const { classes } = this.props;

        let tickets = this.state.tickets
        
        .filter((ticket) => (!ticket.claimer_id || !this.state.showAll))
        .map(ticket =>{
            this.state.color = !this.state.color;
                return (
                    <TicketCard 
                        cookies = {this.cookies} 
                        ticket = {ticket} 
                        color = {this.state.color}
                        claimPress = {this.claimPress}
                        deleteTicket = {this.deleteTicket}
                        expanded = {this.state.expanded}
                        handleChange = {this.handleChange}
                        key = {ticket.id}
                    ></TicketCard>
                )
            });
        

        if (!this.cookies.get('token')) {
            return (
                <Grid container >
                    <Grid item xs = {document.body.offsetWidth < 1000 ? 0 : 4} ></Grid>
                    <Grid item xs = {document.body.offsetWidth < 1000 ? 12 : 4} >
                        <Card className = {classes.card} >
                            <Typography
                                component="h1" 
                                variant="h5"
                                className = {classes.errorText}
                            >You must <a className = {classes.errorLink} href='/log-in'>log in</a> before</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={document.body.offsetWidth < 1000 ? 2 : 4}></Grid>
                </Grid>
            )
        }
        
        if (this.cookies.get('is_hacker') === "true") {
            let user_id = this.cookies.get('user_id');
            let ticket = this.state.tickets.find(function teTicket(element) {
                            return element.user_id == user_id;
                        })
            console.log(this.state.tickets);
            if (ticket) {
                return (
                    <Grid container >
                        <Grid item xs = {document.body.offsetWidth < 1000 ? 0 : 3} ></Grid>
                        <Grid item xs = {document.body.offsetWidth < 1000 ? 12 : 6} >
                            <Card className = {classes.card} >
                                <Typography
                                    variant = 'h4'
                                    className = { classes.title }
                                >Your Ticket</Typography>
                                <TicketCard 
                                    cookies = {this.cookies} 
                                    ticket = {ticket} 
                                    color = {true}
                                    deleteTicket = {this.deleteTicket}
                                    expanded = {this.state.expanded}
                                    handleChange = {this.handleChange}
                                ></TicketCard>
                            </Card>
                        </Grid>
                        <Grid item xs={document.body.offsetWidth < 1000 ? 0 : 3}></Grid>
                    </Grid>
                )
            } else {
                return (
                    <Grid container >
                        <Grid item xs = {document.body.offsetWidth < 1000 ? 0 : 3} ></Grid>
                        <Grid item xs = {document.body.offsetWidth < 1000 ? 12 : 6} >
                            <Card className = {classes.card} >
                                <TicketForm cookies={this.cookies} createTicket={this.createTicket}></TicketForm>
                            </Card>
                        </Grid>
                        <Grid item xs={document.body.offsetWidth < 1000 ? 0 : 3}></Grid>
                    </Grid>
                )
            }
        }

        return (
            <Grid container >
                <Grid item xs = {document.body.offsetWidth < 1000 ? 0 : 3} ></Grid>
                <Grid item xs = {document.body.offsetWidth < 1000 ? 12 : 6} >
                    <Card className = {classes.card} >
                        <Grid container >
                            <Grid item xs= {6}>
                                <Typography
                                    variant = 'h4'
                                >Tickets</Typography>
                            </Grid>
                            <Grid item xs = {6} >
                                <FormGroup>
                                    <FormControlLabel
                                        value="start"
                                        control={<Switch
                                                color='primary'
                                                onChange = {this.toggleShow}
                                            ></Switch>}
                                        label="Claimed"
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                            {tickets}
                        </Card>
                    </Grid>
                <Grid item xs={document.body.offsetWidth < 1000 ? 0 : 3}></Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Tickets);