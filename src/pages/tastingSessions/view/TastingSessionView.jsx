import React, {Component} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';

import axios from 'axios';

import RatingComponent from './Rating';
import User from '../../../User';

import './TastingSessionView.css';

/**
 * TODO: Better design for the layout.
 * TODO: Add list or number of participants.
 * TODO: Add joining buttons for session to this view.
 */

class TastingSessionView extends Component {

  constructor(props) {
    super(props);

    let passedParameters = props.location.state;

    this.state = {
      tastingSessionId: passedParameters.tastingSessionId != null ? passedParameters.tastingSessionId : -1,
      user: passedParameters.user != null ? passedParameters.user : new User(),
      tastingSessionName: '',
      tastingSessionStartingDate: '',
      tastingSessionAdditionalInfo: '',
      tastingSessionBeers: [],
      tastingSessionParticipantsIds: [],
      tastingSessionParticipants: [],
      userJoinedInSession: false
    };

    console.log(props)

    this.createRateBeerCard = this.createRateBeerCard.bind(this);
    this.getSessionsParticipants = this.getSessionsParticipants.bind(this);
    this.getNamesOfParticipants = this.getNamesOfParticipants.bind(this);
  }

  componentWillMount() {
    axios.get('tastingsession/' + this.state.tastingSessionId)
    .then((response) => {
        if(response.status === 200) {
          this.setState({
            tastingSessionName: response.data.name,
            tastingSessionStartingDate: response.data.startingDate,
            tastingSessionAdditionalInfo: response.data.additionalInfo,
            tastingSessionBeers: response.data.beers
          });
        }
    }).then(() => this.getSessionsParticipants())
    .catch(error => console.log(error));
  }

  updateIsUserJoinedInSession() {
    this.state.user.getIsUserJoinedInTastingSession
    .then((response) => {
      if(response.status === 200) {
        this.setState({userJoinedInSession : true});
      } else {
        this.setState({userJoinedInSession : false});
      }
    })
  }

  getSessionsParticipants() {
      axios.get('userandtastingsession/users/' + this.state.tastingSessionId)
          .then((response) => {
              if(response.status === 200) {
                  this.setState({
                      tastingSessionParticipantsIds: response.data
                  });
                  console.log(this.state.tastingSessionParticipantsIds)
              }
          }).then(() => this.getNamesOfParticipants())
          .catch(error => console.log(error));
  }

  getNamesOfParticipants() {
      this.state.tastingSessionParticipantsIds.map((userId) => {
          axios.get('users/' + userId)
              .then((response) => {
                  if(response.status === 200) {
                      this.setState({
                          tastingSessionParticipants: [...this.state.tastingSessionParticipants, response.data]
                      });
                      console.log(this.state.tastingSessionParticipants)
                  }
              })
              .catch(error => console.log(error));})
  }

  createRateBeerCard(beer) {
    return (
      <Card className="shadow align-items-center" style={{width:'23rem'}}>
        <Card.Img variant="top" src={axios.defaults.baseURL + 'images/get/' + beer.id} width="300" height="400" />
          <Card.Body className="text-center w-100">
            <Card.Title>{beer.beerName}</Card.Title>
            <Card.Text>{beer.description}</Card.Text>
            <RatingComponent user={this.state.user} beerId={beer.id}/>
          </Card.Body>
      </Card>
    );
  }

  render() {

    const beerRatingListItems = this.state.tastingSessionBeers.map((d) => {
      return <li className="mb-4">{this.createRateBeerCard(d)}</li>;
    });

    return (
      <Container id="tastingsession-container" className="rounded">
        <Row id="title-date-row">
            <Col>
              <h1 className="ml-4">{this.state.tastingSessionName}</h1>
            </Col>
            <Col>
              <p className="text-right mr-4">{this.state.tastingSessionStartingDate}</p>
            </Col>
        </Row>
        <Row className="justify-content-center">
          <h1 id="header1">
            Information
          </h1>
        </Row>
        <Row className="justify-content-center">
          <div className="border rounded shadow-sm p-3 mb-5 bg-white rounded w-75" align="center">
            {this.state.tastingSessionAdditionalInfo}
          </div>
        </Row>
        <Row className="justify-content-center">
          <h1 id="header1">Drinks</h1>
        </Row>
        <Row className="justify-content-center">
        <ul id="beer-rate-list">
          {beerRatingListItems}
        </ul>
        </Row>
        <Row className="justify-content-center">
            <h1 id="header1">Participants</h1>
        </Row>
        <Row className="justify-content-center">
            <ul id="participant-list">
                { this.state.tastingSessionParticipants.map((user) =>
                    <h5 id="participant">| {user.username} |</h5>
                )}
            </ul>
        </Row>
        <Row className="justify-content-center">
            <h1 id="header1">Manage</h1>
        </Row>
        <Row className="justify-content-center">
            <Button 
              variant="info" 
              className="mr-2 mb-5"
              onClick={() => this.props.history.push("/tastingsessions/create")}
              >
              Modify session
            </Button>
            <Button variant="danger" className="ml-2 mb-5">Delete session</Button>
        </Row>
      </Container>
    );
  }

}

export default TastingSessionView;