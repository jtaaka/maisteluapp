import Cookies from 'js-cookie';

import axios from 'axios';

class User {

  constructor() {
    this.userId = Cookies.get("userId") != null ? Cookies.get("userId") : '';
    this.username = Cookies.get("username") != null ? Cookies.get("username") : '';
    this.usersJoinedSessions = [];

    this.joinTastingSession = this.joinTastingSession.bind(this);
    this.leaveTastingSession = this.leaveTastingSession.bind(this);
    this.getIsUserJoinedInSession = this.getIsUserJoinedInSession.bind(this);
    this.updateJoinedSessions = this.updateJoinedSessions.bind(this);
  }

  joinTastingSession(tastingSessionId, successCallBack) {
    let requestBody = {
      userId: this.userId,
      tastingSessionId: tastingSessionId
    };

    axios
    .post(
      'userandtastingsession/',
      JSON.stringify(requestBody)
    )
    .then(function(response) {
      alert("Succesfully joined tasting session!");
      successCallBack();
    })
    .catch(e => console.log(e));
  }

  leaveTastingSession(tastingSessionId, successCallBack) {
    axios
    .delete(
      'userandtastingsession/', {
        params: {
          userId: this.userId,
          tastingSessionId: tastingSessionId
        }
      }
    )
    .then(function(response) {
      alert("Succesfully left tasting session!");
      successCallBack();
    })
    .catch(e => console.log(e));
  }

  updateJoinedSessions(successCallBack) {
    axios
      .get(
        'userandtastingsession/user/' + this.userId
      )
      .then((response) => {
        if(response.status === 200)
          this.usersJoinedSessions = response.data;

        successCallBack();
      })
      .catch(e => console.log(e));
  }

  getIsUserJoinedInSession(tastingSessionId) {
    axios
    .get(
      'userandtastingsession', {
        params: {
          userId: this.userId,
          tastingSessionId: tastingSessionId
        }
      }
    )
    .then((response) => {
      if(response.status === 200)
        return true;
      else
        return false;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }
}

export default User;