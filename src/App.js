import React, { Component } from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'
import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={LoginAndSignup}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
