import React, { Component } from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom'
import LoginAndSignup from "./pages/loginAndSignup/loginAndSignup";
import Navigation from "./components/navigation/navigation";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={LoginAndSignup}/>
          <Route exact path='/navigation' component={Navigation}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
