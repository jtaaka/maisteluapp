import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import {Navigation} from "./components/navigation/Navigation";
import { Redirect } from 'react-router-dom'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import Profile from "./pages/profile/profile";
import TastingApp from "./pages/tastingApp/tastingApp";
import Beers from "./pages/beers/Beers"
import AddModifyBeer from './pages/beers/add/AddModifyBeer';
import TastingSessions from './pages/tastingSessions/TastingSessions';
import TastingSessionView from './pages/tastingSessions/view/TastingSessionView';
import CreateTastingSession from './pages/tastingSessions/create/CreateTastingSession';
import { refreshToken } from './authorization/Auth';
import BeerInfo from './pages/beers/BeerInfo';

class App extends Component {

  componentWillMount() {
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
  }

  componentDidMount() {
    setInterval(refreshToken, 30000);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ToastContainer/>
          <Navigation/>
          <Switch>
            <Route exact path = '/login' component = {LoginAndSignup}/>  
            <PrivateRoute exact path = '/' component = {TastingApp}/>
            <PrivateRoute exact path = '/profile/profile' component ={Profile}/>
            <PrivateRoute exact path = '/tastingsessions/' component = {TastingSessions}/>
            <PrivateRoute exact path = '/tastingsessions/create' component = {CreateTastingSession}/>
            <PrivateRoute exact path = '/tastingsessions/:id' component = {TastingSessionView} />     
            <PrivateRoute exact path = '/tastingapp/' component = {TastingApp}/>
            <PrivateRoute exact path = '/tastingapp/beers' component = {Beers}/>
            <PrivateRoute exact path = '/tastingapp/beers/add' component = {AddModifyBeer}/>
            <PrivateRoute exact path = '/tastingapp/beers/:id' component = {BeerInfo}/>
            <Redirect from='*' to='/404' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
