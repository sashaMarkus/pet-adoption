import React from "react";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import HomeUser from './components/Home/HomeUser';
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";

const App = () => {
  const user = localStorage.getItem('profile');

  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
            {user ? <Route path='/' exact component={Home} /> : <Route path='/' exact component={HomeUser}/> }
            <Route path='/auth' exact component={Auth} />
            <Route path='/profile'>
                <Profile user={user}/>
            </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
