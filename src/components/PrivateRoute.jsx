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
      isLoggedIn = true;
      auth();
  } else {
      isLoggedIn = false;
  }

  function auth () {
      axios.defaults.headers.common["token"] = Cookies.get("token");
      axios.get("tokenRefresh", "").then((resp) => {
          console.log(resp);
          if(resp.status === 200){
              console.log("true");
              isLoggedIn = true;
          } else {
              isLoggedIn = false;
              this.props.history.push("login");
              console.log("false");
          }
      });
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