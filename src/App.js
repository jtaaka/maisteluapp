import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import {Navigation} from "./components/Navigation";
import { Redirect } from 'react-router-dom'

import axios from 'axios';

import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import TastingApp from "./pages/tastingApp/tastingApp";
import Beers from "./pages/beers/Beers"
import AddModifyBeer from './pages/beers/add/AddModifyBeer';

class App extends Component {

  componentWillMount() {
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route exact path = '/login' component = {LoginAndSignup}/>  
            <PrivateRoute exact path = '/' component = {TastingApp}/>}
            <PrivateRoute exact path = '/tastingapp/' component = {TastingApp}/>
            <PrivateRoute exact path = '/tastingapp/beers' component = {Beers}/>
            <PrivateRoute exact path = '/tastingapp/beers/add' component = {AddModifyBeer}/>
            <Redirect from='*' to='/404' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
