import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

const PrivateRoute = ({ component: Component, ...rest }) => {

  /**
   * TODO: IMPLEMENT THE AUTHENTICATION CHECKING
   */
  let isLoggedIn; // = Cookies.get("token") != undefined;


  if(Cookies.get("token") !== undefined){
      axios.defaults.headers.common["token"] = Cookies.get("token");
      axios.get("tokenTest", "").then((resp) => console.log(resp));
      isLoggedIn = true;
  } else {
      isLoggedIn = false;
  }


  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute