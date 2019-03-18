import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import TastingApp from "./pages/tastingApp/tastingApp";
import Beers from "./components/Beers"
import {Navigation} from "./components/Navigation";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route exact path = '/login' component = {LoginAndSignup}/>  
            <PrivateRoute exact path = '/' component = {TastingApp}/>
            <PrivateRoute exact path = '/tastingapp/beers' component = {Beers}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
