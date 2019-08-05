import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Aux from '../../hoc/Aux';

import { updateContact } from '../../API/API';
import Snackbar from '@material-ui/core/Snackbar';

import { styles } from './ProfileStyle'

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

class profile extends Component {

    state = {
        showEdit: false,
        contact: null,
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleClose = () => {
        this.setState({showEdit: false});
    }

    handleOpen = () => {
        this.setState({showEdit: true});
    }

    editClicked = () => {
        let edit = this.state.showEdit;
        if (edit) {
            updateContact(this.props.cookies.get('user_id'), this.state.contact, this.props.cookies.get('token'),
            (response) => {
                this.props.cookies.set('contact', this.state.contact, { path: '/' });
            }, (error) => {
                this.setState({open: true});
            });
        }
        this.setState({showEdit: !edit});
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    cancelClicked = () => {
        this.setState({showEdit: false});
    }

    componentDidMount() {
        this.setState({contact: this.props.cookies.get('contact')});
    }

    render() {
        const { vertical, horizontal, open } = this.state;
        console.log(this.props)
        const { classes } = this.props;
        let editUser = (
                        <TextField
                            id='contact'
                            label='Contact'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            value={this.state.contact}
                            fullWidth
                        ></TextField>
                    );
        let showContact = (
                        <Typography
                            variant = "subtitle1"
                            className = { classes.text }
                        >Contact: {this.props.cookies.get('contact')}</Typography>
                    );
        let cancelButton = (
                        <Button 
                            variant="contained" 
                            className={classes.cancelButton} 
                            onClick={this.cancelClicked}
                            fullWidth
                        >Cancel</Button>
        );
        return (
            <Grid container >
                <Grid item xs = {4} ></Grid>
                <Grid item xs = {4} >
                    <Card className = {classes.card} >
                        <Typography
                            variant="h4"
                        >{this.props.name}</Typography>
                        <Typography
                            variant="subtitle1"
                            className = { classes.text }
                        >Email: {this.props.email}</Typography>
                        { this.state.showEdit ? editUser : showContact}
                        <Button 
                            variant="contained" 
                            className={classes.button} 
                            onClick={this.editClicked}
                            fullWidth
                            >{this.state.showEdit ? "Save" : "Edit contact"}</Button>
                        {this.state.showEdit ? cancelButton : null}
                        <Snackbar
                            className = { classes.snackbar }
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id"> There was an error. </span>}
                        ></Snackbar>
                    </Card>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(profile);