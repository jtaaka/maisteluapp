import Cookies from 'js-cookie';

import axios from 'axios';

class User {

  constructor() {
    this.userId = Cookies.get("userId") != null ? Cookies.get("userId") : '';
    this.username = Cookies.get("username") != null ? Cookies.get("username") : '';
    this.usersJoinedSessions = [];

    this.joinTastingSession = this.joinTastingSession.bind(this);
    this.leaveTastingSession = this.leaveTastingSession.bind(this);
    this.updateJoinedSessions = this.updateJoinedSessions.bind(this);
    this.getIsUserJoinedInTastingSession = this.getIsUserJoinedInTastingSession.bind(this);
    this.getRating = this.getRating.bind(this);
    this.rateBeer = this.rateBeer.bind(this);
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

  getIsUserJoinedInTastingSession(sessionId) {
    return axios.get('userandtastingsession', {
      params: {
        userId: this.userId,
        tastingSessionId: sessionId
      }
    });
  }

  getRating(beerId) {
    return axios.get('rating', {
      params: {
        userId: this.userId,
        beerId: beerId
      }
    });
  }

  rateBeer(beerId, ratingValue, comment) {
    const requestBody = {
        userId: this.userId,
        beerId: beerId,
        ratingValue: ratingValue,
        comment: comment
    };
    return axios.post('rating', JSON.stringify(requestBody));
  }
}

export default User;