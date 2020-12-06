import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './stylesheets/App.css'

// Services
import AuthService from './services/auth.service';

// Components
import Navigation from './components/Navigation/navigation.component';

// Pages
import Login from './components/login.component';
import About from './components/about.component';
import Profile from './components/profile.component';
import Dashboard from './components/home.component';

// Apps
import Teams from './components/apps/Teams/Teams';
import Calendar from './components/apps/Calendar/Calendar';
import Chat from './components/apps/Chat/Chat';
import Contacts from './components/apps/Contacts/Contacts';
import Announcements from './components/apps/Announcements/Announcements';

export default function App() {
  let authService = new AuthService();
  let [loggedIn, setLoggedIn] = useState(false);
  let [sidebarToggled,setSidebar] = useState(false)
  
  let handleLoginChange = (isLoggedIn) => {
    if (!isLoggedIn) {
      authService.logout();
    }
    setLoggedIn(isLoggedIn);
  }

    return (
      <Router>
        <Navigation 
          sidebar={sidebarToggled}
          setSidebar={setSidebar}
          onLoggedInChange={handleLoginChange}/>
        <Switch>
          <Route path="/login">
            {loggedIn ? <Redirect to='/' /> : <Login loggedIn={loggedIn} onLoggedInChange={handleLoginChange}/>}
          </Route>
          <div class={sidebarToggled? "page sidebar-toggled":"page"}>
            <Route path="about" exact component={About}/>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/calendar" exact component={Calendar}/>
            <Route path="/teams" exact component={Teams}/>
            <Route path="/chat" exact component={Chat}/>
            <Route path="/contacts" exact component={Contacts}/>
            <Route path="/announcements" exact component={Announcements}/>
            <Route path="/user/:username" component={(props) => {return <Profile {...props} />}}>
          </Route>
          </div>
        </Switch>
      </Router>
    );
  }
  
