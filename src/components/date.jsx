import React, { Component } from 'react';
import {DatePicker} from '@y0c/react-datepicker';
import 'moment/locale/en-gb';
import '@y0c/react-datepicker/assets/styles/calendar.scss';

class Date extends Component {

  dateChange = (date) => {
    console.log("date: " + date);
  }

  render() {
    return (
      <DatePicker locale="en-gb" onChange={this.dateChange} showDefaultIcon/>
    )
  }
}

export default Date;
