import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './stylesheets/App.css'

// Services
import AuthService from './services/auth.service';

// Components
import Navigation from './components/Navigation/navigation.component';

// Pages
import Login from './Pages/Login';
import About from './Pages/About';
import Dashboard from './Pages/Home';
import Error from './Pages/NotFound';
import Profile from './Pages/Profile';

// Apps
import Teams from './apps/Teams/Teams';
import TeamView from './apps/Teams/TeamView';
import Calendar from './apps/Calendar/Calendar';
import Chat from './apps/Chat/Chat';
import Contacts from './apps/Contacts/Contacts';
import Announcements from './apps/Announcements/Announcements';

export default function App() {
  let authService = new AuthService();
  let [loggedIn, setLoggedIn] = useState(false);
  let [sidebarToggled,setSidebar] = useState(true)
  let [userData, setUserData] = useState({noUser: 'notLoggedIn'});
  
  let handleLoginChange = async (isLoggedIn) => {
    if (!isLoggedIn) {
      authService.logout();
    }
    await getUserData();
    setLoggedIn(isLoggedIn);
  }

  let getUserData = async () => {
    let userToken = localStorage.getItem('token');
    if (userToken) {
      let data = await authService.getCurrentUser(userToken);
      setUserData(data);
    }
  }

    return (
      <Router>
        {loggedIn ? 
          <Navigation 
            sidebar={sidebarToggled}
            setSidebar={setSidebar}
            onLoggedInChange={handleLoginChange}
            userInfo={userData}/> : <></>
          }
        <Switch>
            <Route path="/login">
              {loggedIn ? <Redirect to='/' /> : <Login loggedIn={loggedIn} onLoggedInChange={handleLoginChange}/>}
            </Route>
            <Route path="/about" exact component={About}/>
            <Route path="/404" exact component={Error}/>
          {loggedIn ? 
            <div className={sidebarToggled? "page sidebar-toggled":"page"}>
              <Route path="/" exact component={Dashboard}/>
              <Route path="/calendar" exact component={Calendar}/>
              <Route path="/teams" exact component={Teams}/>
              <Route path="/chat" exact component={Chat}/>
              <Route path="/contacts" exact component={() => {return <Contacts userInfo={userData}/>}}/>
              <Route path="/announcements" exact component={Announcements}/>
              <Route path="/user/:username" component={(props) => {return <Profile {...props} userInfo={userData} />}}/>
              <Route path="/teams/:teamUsername" component={TeamView}/>
            </div>
            : <Redirect to='/login' />
          }
        </Switch>
      </Router>
    );
  }
  
