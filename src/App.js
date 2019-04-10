import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import {Navigation} from "./components/Navigation";
import { Redirect } from 'react-router-dom'

import axios from 'axios';

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import TastingApp from "./pages/tastingApp/tastingApp";
import Beers from "./pages/beers/Beers"
import AddModifyBeer from './pages/beers/add/AddModifyBeer';
import TastingSessions from './pages/tastingSessions/TastingSessions';
import TastingSessionView from './pages/tastingSessions/view/TastingSessionView';
import CreateTastingSession from './pages/tastingSessions/create/CreateTastingSession';
import { refreshToken } from './authorization/Auth';
import BeerInfo from './pages/beers/BeerInfo';

import Notification from './components/Notification'


class App extends Component {

  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();

    this.addNotification = this.addNotification.bind(this);
  }

  addNotification() {
    console.log(App.this);
    this.notificationDOMRef.current.addNotification({
        title: "Awesomeness",
        message: "Awesome Notifications!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
      });
      console.log("HEHHE");
  }

  componentWillMount() {
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
  }

  componentDidMount() {
    setInterval(refreshToken, 30000);
   // this.addNotification();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route exact path = '/login' component = {LoginAndSignup}/>  
            <PrivateRoute exact path = '/' component = {TastingApp}/>
            <PrivateRoute exact path = '/tastingsessions/' component = {TastingSessions}/>
            <PrivateRoute exact path = '/tastingsessions/create' component = {CreateTastingSession}/>
            <PrivateRoute exact path = '/tastingsessions/:id' component = {TastingSessionView}/>
            <PrivateRoute exact path = '/tastingapp/' component = {TastingApp}/>
            <PrivateRoute exact path = '/tastingapp/beers' component = {Beers}/>
            <PrivateRoute exact path = '/tastingapp/beers/add' component = {AddModifyBeer}/>
            <PrivateRoute exact path = '/tastingapp/beers/:id' component ={BeerInfo}/>
            <Redirect from='*' to='/404' />
          </Switch>
          <ReactNotification ref={this.notificationDOMRef} />
          <Notification notificationRef={this.notificationDOMRef}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
