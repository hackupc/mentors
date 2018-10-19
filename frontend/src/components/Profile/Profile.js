import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import Aux from '../../hoc/Aux';

import { updateContact } from '../../API/API';
import Snackbar from '@material-ui/core/Snackbar';


const styles = {
    card: {
        maxWidth: 400,
        padding: 16,
        margin: 16
    },
    button: {
        margin: 16
    }
};

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
        vertical: 'top',
        horizontal: 'center',
    }

    logOut = () => {
        this.props.cookies.remove("token");
        this.props.cookies.remove("email");
        this.props.cookies.remove("name");
        this.props.cookies.remove("user_id");
        this.props.cookies.remove("contact");
        window.location = "/";
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
        let editUser = <Aux><TextField
                            id='contact'
                            label='Contact'
                            className={classes.textField}
                            margin='normal'
                            onChange={this.handleChange}
                            value={this.state.contact}
                            /><br/></Aux>;
        let showContact = <p>Contact: {this.props.cookies.get('contact')}</p>;
        return (
            <div>
                <center>
                    <Card className={classes.card}>
                        <h2>{this.props.name}</h2><br/>
                        Email: {this.props.email}<br/>
                        { this.state.showEdit ? editUser : showContact}
                        {this.state.showEdit ? <Button variant="contained" className={classes.button} onClick={this.cancelClicked}> Cancel </Button> : null}
                        <Button variant="contained" className={classes.button} onClick={this.editClicked}>{this.state.showEdit ? "Save" : "Edit contact"}</Button>
                    </Card>

                    <Button variant="contained" onClick={this.logOut}>Log out</Button>

                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id"> There was an error. </span>}
                    />
                </center>
            </div>
        );
    }
}

export default withStyles(styles)(profile);