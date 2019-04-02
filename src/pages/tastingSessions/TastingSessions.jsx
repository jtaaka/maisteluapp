import React, {Component} from 'react';

import {Container, Card, Button} from 'react-bootstrap';

import axios from 'axios';

import moment from 'moment';

import {DATE_FORMAT} from '../../GlobalConfig';

import './TastingSessions.css';
import User from '../../User';

const DESCRIPTION_MAX_LENGTH = 250;

class TastingSessions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: new User(),
      tastingSessions: []
    };

    this.createTastingSessionCard = this.createTastingSessionCard.bind(this);
  }

  componentWillMount() {
    axios.get(
      'tastingsession/'
    )
    .then(response => {
      if(response.status === 200) {
          this.setState({tastingSessions: response.data});
          console.log(response.data);
      }
    })
    .catch(function(response) {
      console.log(response);
    });
  }

  createTastingSessionCard(id, startingDateTime, name, additionalInfo) {

    /* Limits the additional info text length in the card */
    if(additionalInfo.length > DESCRIPTION_MAX_LENGTH) {
      additionalInfo = additionalInfo.slice(0, DESCRIPTION_MAX_LENGTH) + '...';
    }

    startingDateTime = moment(new Date(startingDateTime)).format(DATE_FORMAT);

    return (
      <li sessionId={id}>
        <Card className="m-2">
          <Card.Header as="h5">{startingDateTime}</Card.Header>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {additionalInfo}
            </Card.Text>
            <Button variant="info" className="m-1">Info</Button>
            <Button variant="success" className="m-1" onClick={() => this.state.user.joinTastingSession(id)}>Join session(TODO)</Button>
          </Card.Body>
        </Card>
      </li>
    );
  }

  render() {

    const listOfTastingSessions = this.state.tastingSessions.map((d) => 
      this.createTastingSessionCard(d.id, d.startingDate, d.name, d.additionalInfo)
    );

    return (
      <Container id="tastingSessionsContainer" className="rounded">
        <h1>Tasting sessions</h1>
        <ul id="tastingSessionsList">
          {listOfTastingSessions}
        </ul>
      </Container>
    );
  }
}

export default TastingSessions;