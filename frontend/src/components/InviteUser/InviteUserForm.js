import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { inviteUser } from '../../API/API'
import Typography from '@material-ui/core/Typography';


import { styles } from './InviteUserFormStyle'


class InviteUserForm extends Component {

    state = {
        email: null,
        notification: '',
        vertical: 'bottom',
        horizontal: 'center',
        open: false
    }

    cookies = this.props.cookies

    handleTicketSubmit = () => {
        inviteUser(this.state.email, this.props.cookies.get('token'),
        (response) => {
            console.log(response.data);
            this.state.notification = 'Email sent successfully';
            this.setState({open: true})
        }, (error) => {
            console.log(error);
            this.state.notification = 'There has been an error';
            this.setState({open: true})
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { vertical, horizontal, open } = this.state;
        return (            
            <form noValidate autoComplete='off'>
                <Typography
                    variant = 'h4'
                >Invite mentor</Typography>
                <Typography
                    variant = 'subtitle1'
                >An email with an invitation code will be send to the mentor. Then they have to register on <strong>/mentors/register</strong>.</Typography>
                <Typography
                    variant = 'subtitle1'
                >(They must use the same email they received the code to register).</Typography>
                <TextField
                    id='email'
                    label='Email'
                    margin='normal'
                    onChange={this.handleChange}
                    fullWidth
                    name="email"
                    autoFocus
                    value = {this.state.email}
                    error = {this.state.email && !this.state.email.includes("@")}
                    helperText = {this.state.email && !this.state.email.includes("@") ? 'Email is not valid' : ''}
                /><br/>
                <Button
                    fullWidth
                    variant='contained' 
                    color='primary' 
                    className={classes.button} 
                    onClick={this.handleTicketSubmit}
                    disabled = {!(this.state.email && this.state.email.includes("@"))}
                >Invite mentor</Button>
                <Snackbar
                    className={classes.snackbar}
                    anchorOrigin={ {vertical, horizontal} }
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.notification}</span>}
                ></Snackbar>
            </form>
        );
    }
}

export default withStyles(styles)(InviteUserForm);