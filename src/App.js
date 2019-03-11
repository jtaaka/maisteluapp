import React, { Component } from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'
import Login from "./pages/login/login";
import Date from "./components/date";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/testi' component={Date}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
