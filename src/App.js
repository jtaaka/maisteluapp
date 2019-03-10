import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from "./pages/login/login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
