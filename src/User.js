import Cookies from 'js-cookie';

class User {
  constructor() {
    this.userId = Cookies.get("userId") != null ? Cookies.get("userId") : '';
    this.username = Cookies.get("username") != null ? Cookies.get("username") : '';
  }
}

export default User;