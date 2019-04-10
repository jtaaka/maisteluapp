import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Container, Card, Button} from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';

import {DATE_FORMAT} from '../../GlobalConfig';
import User from '../../User';

import './TastingSessions.css';

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

  /**
   * Updates the users list of joined sessions and then
   * updates the state.
   */
  updateUserState() {
    this.state.user.updateJoinedSessions(() => this.setState({user: this.state.user}));
  }

  handleOnClick(event) {
    event.preventDefault();
    if(event.target.id === 'join') {
      /* Join tasting session button */
      this.state.user.joinTastingSession(
        event.currentTarget.getAttribute('sessionid'),
        this.updateUserState
      );
    } else if(event.target.id === 'cancel') {
      /* Cancel joining tasting session button */
      this.state.user.leaveTastingSession(
        event.currentTarget.getAttribute('sessionid'),
        this.updateUserState
      );
    }
  }

  /**
   * Creates a single bootstrap card that contains
   * information of a tasting sessions and info and join/cancel
   * join buttons.
   * 
   * @param {*} id 
   * @param {*} startingDateTime 
   * @param {*} name 
   * @param {*} additionalInfo 
   */
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
            <Link 
              style={{ textDecoration: 'none' }} 
              to={{
                pathname: '/tastingsessions/' + id,
                state: { 
                  tastingSessionId: id,
                 }
              }}>
              <Button variant="info" className="m-1">Info</Button>
            </Link>
            {this.createJoinOrCancelJoinButton(id)}
          </Card.Body>
        </Card>
      </li>
    );
  }

  /**
   * Creates join/cancel join button for a tasting
   * session card depenging on if the user is already
   * joined or not.
   * 
   * @param {*} sessionId 
   */
  createJoinOrCancelJoinButton(sessionId) {
      let listOfJoinedSessions = this.state.user.usersJoinedSessions;
      for(let i = 0; i < listOfJoinedSessions.length; i++) {
        if(sessionId === listOfJoinedSessions[i]) {
          return <Button 
                    id="cancel" 
                    sessionid={sessionId} 
                    variant="danger" 
                    className="m-1" 
                    onClick={this.handleOnClick}>
                    Quit session
                  </Button>;
        }
      }
      return <Button 
                id="join" 
                sessionid={sessionId} 
                variant="success" 
                className="m-1" 
                onClick={this.handleOnClick}>
                Join session
              </Button>;
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