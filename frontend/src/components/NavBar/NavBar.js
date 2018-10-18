import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/Aux'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bar: {
    colorPrimary: '#d13f5a',
    colorDefault: '#d13f5a'
  }
};

const ButtonAppBar = (props) => {
  const { classes } = props;
  let rightLinks;
  console.log('navbar ' + props.email)
  if (props.email) {
    rightLinks = (
    <Aux>
      { props.cookies.get("is_admin") === true ? <NavLink to="/admin"style={{'color': 'white', 'margin': '10px'}}>Admin</NavLink> : null}
      <NavLink to="/tickets" style={{'color': 'white', 'margin': '10px'}}>Tickets</NavLink>
      <NavLink to="/profile" style={{'color': 'white', 'margin': '10px'}}>{props.email}</NavLink>
    </Aux>);
  } else {
    rightLinks = (
      <Aux>
        <NavLink to="/tickets" style={{'color': 'white', 'margin': '10px'}}>Tickets</NavLink>
        <NavLink to="/log-in" style={{'color': 'white', 'margin': '10px'}}>Log In</NavLink>
        <NavLink to="sign-in" style={{'color': 'white', 'margin': '10px'}}>Sign Up</NavLink>
      </Aux>
      );
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#d13f5a'}} color="default">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            <NavLink to="" style={{'color': 'white'}}>HackUPC Mentors</NavLink>
          </Typography>
          {rightLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);