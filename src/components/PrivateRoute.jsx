import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkCookies } from '../authorization/Auth';


const PrivateRoute = ({ component: Component, ...rest }) => {

  /**
   * TODO: IMPLEMENT THE AUTHENTICATION CHECKING
   */
  let isLoggedIn = checkCookies();
  // = Cookies.get("token") != undefined;
  


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