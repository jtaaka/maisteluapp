import React, { Component } from 'react';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import TimeContainer from "@y0c/react-datepicker/lib/components/TimeContainer";

class Time extends Component {

  timeChange = (hour, minutes, type) => {
    console.log("hour: " + hour);
    console.log("minutes: " + minutes);
    console.log("AM | PM: " + type);
  }

  render() {
    return (
      <TimeContainer onChange={this.timeChange}/>
    )
  }
}

export default Time;
