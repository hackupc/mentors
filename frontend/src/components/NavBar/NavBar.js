import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/Aux'

import { styles } from './NavBarStyle'




const ButtonAppBar = (props) => {
  const { classes } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function logOut() {
    setAnchorEl(null);
    props.cookies.remove("token");
    props.cookies.remove("email");
    props.cookies.remove("name");
    props.cookies.remove("user_id");
    props.cookies.remove("contact");
    window.location = "/";
}

  function handleClose() {
    setAnchorEl(null);
  }

  function profile() {
    setAnchorEl(null);
    window.location = "/profile";
  }

  let rightLinks;
  let admin = null;
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
        <Avatar 
          onClick={handleMenu}
          className={classes.avatar}
        >{props.name ? props.name.slice(0,2) : ''}</Avatar>
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
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className = { classes.menu }
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            keepMounted
          >
            <MenuItem 
              onClick={profile}
              className = { classes.menuItem}
              >Profile</MenuItem>
            <MenuItem 
              onClick={logOut}
              className = { classes.menuItem}              
            >Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);