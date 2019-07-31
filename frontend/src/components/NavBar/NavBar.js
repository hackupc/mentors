import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/Aux'

import { styles } from './NavBarStyle'


const ButtonAppBar = (props) => {
  const { classes } = props;
  let rightLinks;
  let admin = null;
  console.log(props.cookies.get('is_admin'));
  let isAdmin = props.cookies.get('is_admin');
  if (isAdmin === "true") {
    admin = (
      <NavLink 
        to="/admin" 
        className={classes.navBarLink} 
        activeClassName={classes.navBarLinkActive} 
      >Admin</NavLink>)
  }
  if (props.email) {
    rightLinks = (
      <Aux>
        { admin }
        <NavLink 
          to="/tickets" 
          className={classes.navBarLink} 
          activeClassName={classes.navBarLinkActive}
        >Tickets</NavLink>
        <NavLink 
          to="/profile" 
          className={classes.navBarLink} 
          activeClassName={classes.navBarLinkActive}
        >{props.name}</NavLink>
      </Aux>);
  } else {
    rightLinks = (
      <Aux>
        <NavLink 
          to="/log-in" 
          className={classes.navBarLink} 
          activeClassName={classes.navBarLinkActive} 
        >Log In</NavLink>
        <NavLink 
          to="/sign-up" 
          className={classes.navBarLink} 
          activeClassName={classes.navBarLinkActive} 
        >Sign Up</NavLink>
      </Aux>
      );
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBarStyle} color="default">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            <NavLink to="" className={classes.navBarTitle} >HackUPC Mentors</NavLink>
          </Typography>
          {rightLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);