import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Route, BrowserRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import LogIn from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import WelcomePage from '../components/WelcomePage/WelcomePage';
import Tickets from '../containers/Tickets/Tickets';
import TicketForm from '../components/TicketForm/TicketForm';
import Profile from '../components/Profile/Profile';
import Admin from '../components/Admin/Admin';
import MentorRegister from '../components/MentorRegister/MentorRegister'
import { MuiThemeProvider } from '@material-ui/core';
import {theme} from './Theme'

class App extends Component {
  state = {
    email: null,
    name: null,
    contact: null
  }

  onLogin = (email, name, contact) => {
    this.setState( {email: email, name: name, contact: contact} );
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <MuiThemeProvider theme={theme} >
            <NavBar email={this.props.cookies.get('email')} name={this.props.cookies.get('name')} cookies={this.props.cookies}></NavBar>
            <Route path="/" exact render={() => <WelcomePage cookies={this.props.cookies}></WelcomePage>}/>
            <Route path="/log-in" exact render={() => <LogIn onLogin={this.onLogin} cookies={this.props.cookies}></LogIn>}/>
            <Route path="/sign-up" exact render={() => <SignUp cookies={this.props.cookies}></SignUp>}/>
            <Route path="/tickets" exact render={() => <Tickets email={this.props.cookies.get('email')} cookies={this.props.cookies}/>}/>
            <Route path="/tickets/create" render={() => <TicketForm cookies={this.props.cookies}></TicketForm>}/>
            <Route path="/profile" render={() => <Profile cookies={this.props.cookies} name={this.props.cookies.get('name')} email={this.props.cookies.get('email')} contact={this.props.cookies.get('contact')} />}/>
            <Route path="/admin" render={() => <Admin cookies={this.props.cookies}/>}/>
            <Route path="/mentors/register" render={() => <MentorRegister cookies={this.props.cookies}/>}/>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
