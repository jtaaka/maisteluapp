import Cookies from 'js-cookie';

import axios from 'axios';

class User {

  constructor() {
    this.userId = Cookies.get("userId") != null ? Cookies.get("userId") : '';
    this.username = Cookies.get("username") != null ? Cookies.get("username") : '';

    this.joinTastingSession = this.joinTastingSession.bind(this);
  }

  joinTastingSession(tastingSessionId) {
    let requestBody = {
      userId: this.userId,
      tastingSessionId: tastingSessionId
    };

    console.log("CURRENT BODY: " + JSON.stringify(requestBody));

    axios
    .post(
      'users/jointastingsession',
      JSON.stringify(requestBody)
    )
    .then(r => alert("Succesfully joined tasting session!"))
    .catch(e => console.log(e));
  }
}

export default User;