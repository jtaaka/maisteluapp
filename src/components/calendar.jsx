import React, { Component } from 'react';
import { DatePicker } from '@y0c/react-datepicker';
import Container from 'react-bootstrap/Container'
import 'moment/locale/en-gb';
import '@y0c/react-datepicker/assets/styles/calendar.scss';

class Calendar extends Component {

  onChange = (date) => {
    console.log(date);
  }

  render() {
    return (
      <Container>
      <DatePicker locale="en-gb" onChange={this.onChange}/>
      </Container>
    )
  }
}

export default Calendar;

