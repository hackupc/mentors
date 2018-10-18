import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { claimTicket } from '../../API/API';

const styles = {
    card: {
      minWidth: 275,
      maxWidth: 300,
      margin: 16,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
      textAlign: 'left'
    },
  };

function ticketCard(props) {
    const { classes } = props;

    function claim(ticket, user_id, token) {
        console.log("claiming");
        console.log(ticket)
        claimTicket(ticket, token, user_id, (response) => {
            props.onClaim(response)
        }, (error) => {
    
        });
    }

    function viewTicket() {
        props.onView(props.ticket);
    }

    return (
    <Card className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textPrimary">
                {props.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                {props.description}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                Slack: {props.email}<br></br>
                Location: {props.location}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={viewTicket}>View</Button>
            {props.cookies.get('is_mentor') === "true" || props.cookies.get('is_admin') === "true" ? <Button size="small" onClick={() => claim(props.ticket, props.cookies.get('user_id'), props.cookies.get('token'))}>Claim</Button> : null}
        </CardActions>
    </Card>
    );
}
  

export default withStyles(styles)(ticketCard);