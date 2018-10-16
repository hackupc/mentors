import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import InviteUserForm from '../InviteUser/InviteUserForm'

import { getUsers } from '../../API/API'

const styles = theme => ({
    root: {
        padding: 16,
        width: '100%',
        maxWidth: 500,
    },
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
        right: 16,
        bottom: 16
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

class Admin extends Component {
    cookies = this.props.cookies

    state = {
        users: [],
        showAddUsers: false
    }

    componentDidMount() {
        getUsers(this.handleUsersResponse, this.handleErrorResponse, this.props.cookies.get('token'));
    }

    handleErrorResponse = (error) => {

    }

    handleUsersResponse = (users) => {
        console.log(users)
        this.setState( {users: users} )
    }

    handleButtonInviteClick = () => {
        
    }

    handleOpen = () => {
        this.setState({ showAddUsers: true });
    };
    
    handleClose = () => {
        this.setState({ showAddUsers: false });
    };

    getRoleForUser (user) {
        if (user.is_admin) {
            return "(Admin)"
        } else if (user.is_mentor) {
            return "(Mentor)"
        } else if (user.is_hacker) {
            return "(Hacker)"
        }
    }

    render() {
        const { classes } = this.props;

        let usersList;
        if (this.state.users) {
            usersList = this.state.users.map((user) => {
                return <ListItem>{user.name}, {user.email} {this.getRoleForUser(user)}</ListItem>
            })
        }

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.showAddUsers}
                    onClose={this.handleClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <InviteUserForm cookies={this.cookies}></InviteUserForm>
                    </div>
                </Modal>
                <Button style={styles.button} onClick={this.handleOpen}>Invite mentor</Button>
                <center>
                    <div className={classes.root}>
                        <Card>
                            <h4>Users</h4>
                            <List>
                                {usersList}
                            </List>
                        </Card>
                    </div>
                </center>
            </div>
        )
    }
}

export default withStyles(styles)(Admin);