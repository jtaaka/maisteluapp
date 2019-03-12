import React, { Component } from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'
import Login from "./pages/login/login";
import Date from "./components/date";
import Signup from "./pages/signup/signup";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/testi' component={Date}/>
          <Route exact path='/signup' component={Signup}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
