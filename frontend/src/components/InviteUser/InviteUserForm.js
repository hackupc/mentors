import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { inviteUser } from '../../API/API'


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

class InviteUserForm extends Component {

    state = {
        email: null
    }

    cookies = this.props.cookies

    handleTicketSubmit = () => {
        inviteUser(this.state.email, this.props.cookies.get('token'),
        (response) => {

        }, (error) => {

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
            <form noValidate autoComplete='off'>
                <center>
                <h4>Invite mentor</h4>
                <p>An email with an invitation code will be send to the mentor. Then they have to register on <strong>/mentors/register</strong>.</p>
                <p>(They must use the same email they received the code to register).</p>
                <TextField
                    id='email'
                    label='Email'
                    className={classes.textField}
                    margin='normal'
                    onChange={this.handleChange}
                /><br/>
                <Button variant='contained' color='primary' className={classes.button} onClick={this.handleTicketSubmit}>
                    Invite user
                </Button>
                </center>
            </form>
        </Aux>
        );
    }
}

export default withStyles(styles)(InviteUserForm);