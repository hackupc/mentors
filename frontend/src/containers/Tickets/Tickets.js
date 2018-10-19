import React, { Component } from 'react';

import TicketCard from '../../components/TicketCard/TicketCard';
import { loadTickets } from '../../API/API'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import Modal from '@material-ui/core/Modal';

import TicketForm from '../../components/TicketForm/TicketForm'
import TicketDetail from '../../components/TicketDetail/TicketDetail'

import './Tickets.css'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      position: 'fixed',
      right: 16,
      bottom: 16,
      backgroundColor: '#d13f5a',
      "&:hover": {
          backgroundColor: "#d13f5a"
      }
    },
    topButton: {
      margin: theme.spacing.unit,
      position: 'fixed',
      top: 68,
      right: 16
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      }
});

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

class Tickets extends Component {
    cookies = this.props.cookies

    state = {
        tickets: [],
        showAll: true,
        open: false,
        editing: false,
        selectedTicket: null
    }

    ticketsLoadedHandler = (tickets) => {
        this.setState({tickets: tickets.data});
    }

    componentDidMount () {
        console.log("getting tickets");
        loadTickets(this.ticketsLoadedHandler, this.props.cookies.get('token'));
    }

    toggleShow = () => {
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
                return (
                        <Grid item key={ticket.id} xs={12} sm={3}>
                            <TicketCard 
                                mine={ticket.user_id == this.props.cookies.get('user_id')}
                                ticket={ticket}
                                cookies={this.props.cookies}
                                onClaim={this.onTicketClaimed}
                                onView={this.handleEditing}/>
                        </Grid>
                )
            });
        

        if (!this.cookies.get('token')) {
            return <center><h1>You must <a href='/sign-in'>log in</a> before</h1></center>
        }

        return (
            <div>
                {this.props.cookies.get('is_admin') === "true" || this.props.cookies.get('is_mentor') === "true" ? <Button variant="contained" className={classes.topButton} onClick={this.toggleShow}>{this.state.showAll ? "Show claimed" : "Show pending"}</Button> : null}
                <center>
                    <h3>Tickets</h3>
                    <Grid container spacing={32} className={classes.demo} justify="center">
                        {t}
                    </Grid>     
                </center>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                        <div style={getModalStyle()} className={classes.paper}>
                            <TicketForm cookies={this.cookies} onCreate={this.onCreateTicket}></TicketForm>
                            
                        </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editing}
                    onClose={this.handleEndEditing}>
                        <div style={getModalStyle()} className={classes.paper}>
                            <TicketDetail 
                                ticket={this.state.selectedTicket}
                                cookies={this.cookies}
                                onEdit={this.onEditTicket}
                                onDelete={this.onDeleteTicket}/>
                            
                        </div>
                </Modal>
                {this.props.cookies.get('is_hacker') ? <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={this.handleOpen}>
                    <AddIcon />
                </Button> : null}
                
            </div>
        )
    }
}

export default withStyles(styles)(Tickets);