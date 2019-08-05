import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



import InviteUserForm from '../InviteUser/InviteUserForm'

import { getUsers } from '../../API/API'

import { styles } from './AdminStyles'

class Admin extends Component {
    cookies = this.props.cookies

    state = {
        users: [],
        showAddUsers: false,
        nRow: false
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

        if (!this.cookies.get('token')) {
            console.log('redirecting');
            return <Redirect to='/log-in'/>
        }

        let usersList;
        if (this.state.users) {
            usersList = this.state.users.map((user) => {
                this.state.nRow = !this.state.nRow
                return (
                    <TableRow className= {this.state.nRow ? classes.rowNonPair : classes.rowPair}>
                        <TableCell className={classes.tableBody}>{user.name}</TableCell>
                        <TableCell className={classes.tableBody}>{user.email}</TableCell>
                        <TableCell className={classes.tableBody}>{this.getRoleForUser(user)}</TableCell>
                    </TableRow>
                )
            })
        }

        return (
            <Grid container >
                <Grid item xs = {4} ></Grid>
                <Grid item xs = {4} >
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.showAddUsers}
                        onClose={this.handleClose}>
                        <Grid container >
                            <Grid item xs = {4} ></Grid>
                            <Grid item xs = {4} >
                                <div className={classes.paper}>
                                <InviteUserForm cookies={this.cookies}></InviteUserForm>
                                </div>
                            </Grid>
                        <Grid item xs={4}></Grid>
                        </Grid>
                    </Modal>
                    <Card className = {classes.card}>
                        <Typography
                            variant="h4"
                        >Users</Typography>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHead}>Names</TableCell>
                                    <TableCell className={classes.tableHead}>Emails</TableCell>
                                    <TableCell className={classes.tableHead}>Roles</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersList}
                            </TableBody>
                        </Table>
                        <Button 
                            variant="contained" 
                            className={classes.button} 
                            onClick={this.handleOpen}
                            fullWidth
                        >Invite mentor</Button>
                    </Card>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Admin);