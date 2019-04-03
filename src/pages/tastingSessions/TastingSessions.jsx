import React, {Component} from 'react';

import {Container, Card, Button} from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';

import {DATE_FORMAT} from '../../GlobalConfig';
import User from '../../User';

import './TastingSessions.css';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

const DESCRIPTION_MAX_LENGTH = 250;

class TastingSessions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: new User(),
      tastingSessions: []
    };

    this.state.user.updateJoinedSessions();

    this.updateUserState = this.updateUserState.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.createTastingSessionCard = this.createTastingSessionCard.bind(this);
    this.createJoinOrCancelJoinButton = this.createJoinOrCancelJoinButton.bind(this);
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

  updateUserState() {
    console.log("AND WE ARE DONE.");
    this.state.user.updateJoinedSessions();
    this.setState({user: this.state.user});
  }

  handleOnClick(event) {
    event.preventDefault();
    console.log(event.target.sessionid + "HEHE")
    if(event.target.id === 'join') {
      /* Join tasting session button */
      this.state.user.joinTastingSession(event.target.sessionid, this.updateUserState);
    } else if(event.target.id === 'cancel') {
      /* Cancel joining tasting session button */

      this.state.user.leaveTastingSession(event.target.sessionid, this.updateUserState);
    }
  }

  createTastingSessionCard(id, startingDateTime, name, additionalInfo) {

    /* Limits the additional info text length in the card */
    if(additionalInfo.length > DESCRIPTION_MAX_LENGTH) {
      additionalInfo = additionalInfo.slice(0, DESCRIPTION_MAX_LENGTH) + '...';
    }

    startingDateTime = moment(new Date(startingDateTime)).format(DATE_FORMAT);

    return (
      <li sessionid={id}>
        <Card className="m-2">
          <Card.Header as="h5">{startingDateTime}</Card.Header>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {additionalInfo}
            </Card.Text>
            <Button variant="info" className="m-1">Info</Button>
            {this.createJoinOrCancelJoinButton(id)}
          </Card.Body>
        </Card>
      </li>
    );
  }

  createJoinOrCancelJoinButton(sessionId) {
      let listOfJoinedSessions = this.state.user.usersJoinedSessions;
      for(let i = 0; i < listOfJoinedSessions.length; i++) {
        if(sessionId === listOfJoinedSessions[i]) {
          return <Button id="cancel" sessionid={sessionId} variant="danger" className="m-1" onClick={this.handleOnClick}>Lily kiss me</Button>;
        }
      }
      return <Button id="join" sessionid={sessionId} variant="success" className="m-1" onClick={this.handleOnClick}>Join session(TODO)</Button>;
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