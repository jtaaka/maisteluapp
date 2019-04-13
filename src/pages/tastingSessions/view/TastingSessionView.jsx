import React, {Component} from 'react';
import {Container, Row, Col, Card, Form} from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';

import RatingComponent from './Rating';
import User from '../../../User';
import {DATE_FORMAT} from '../../../GlobalConfig';

import beerImg from '../../../img/testbeer.png';

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
      userJoinedInSession: false
    };

    this.createRateBeerCard = this.createRateBeerCard.bind(this);
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
    })
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

  createRateBeerCard(beer) {
    return (
      <Card className="shadow align-items-center" style={{width:'23rem'}}>
        <Card.Img variant="top" src={beerImg} />
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
            Information:
          </h1>
        </Row>
        <Row className="justify-content-center">
          <div className="border rounded shadow-sm p-3 mb-5 bg-white rounded w-75" align="center">
            {this.state.tastingSessionAdditionalInfo}
          </div>
        </Row>
        <Row className="justify-content-center">
          <h1 id="header1">Drinks:</h1>
        </Row>
        <Row className="justify-content-center homo">
        <ul id="beer-rate-list">
          {beerRatingListItems}
        </ul>
        </Row>
      </Container>
    );
  }

}

export default TastingSessionView;