import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkCookies, refreshToken } from '../authorization/Auth';


const PrivateRoute = ({ component: Component, ...rest }) => {

  /**
   * TODO: IMPLEMENT THE AUTHENTICATION CHECKING
   */
  let isLoggedIn = checkCookies();
  refreshToken();
  // = Cookies.get("token") != undefined;
  
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute