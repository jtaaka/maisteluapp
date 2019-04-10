import React, {Component} from 'react';

/**
 * Master l33th4x class for using notifications as all around
 * functions. -GodTeemu
 */
class Notification extends Component {

    constructor(props) {
        super(props);

        console.log(props.notificationRef);
        console.log(props);

        this.notificationRef = props.notificationRef;

        this.addNotification = this.addNotification.bind(this);
    }

    addNotification() {
        this.notificationRef.current.addNotification({
          title: "Awesomeness",
          message: "Awesome Notifications!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      }

    render() {
        return<div></div>
    }
}

export default Notification;