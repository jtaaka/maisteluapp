import React, {Component} from 'react';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';

import User from '../../../User';
import {DATE_FORMAT} from '../../../GlobalConfig';

import beerImg from '../../../img/testbeer.png';

import './TastingSessionView.css';

class TastingSessionView extends Component {

  constructor(props) {
    super(props);

    let passedParameters = props.location.state;

    this.state = {
      tastingSessionId: passedParameters.tastingSessionId != null ? passedParameters.tastingSessionId : -1,
      user: passedParameters.user != null ? passedParameters.user : new User(),
      tastingSessionName: '',
      tastingSessionStartingDate: new Date(),
      tastingSessionAdditionalInfo: '',
      tastingSessionBeers: [],
      userJoinedInSession: false
    };

    this.createRateBeerCard = this.createRateBeerCard.bind(this);
    //this.createJoinOrQuitSessionButton = this.createJoinOrQuitSessionButton.bind(this);
  }

  componentWillMount() {
    axios.get('tastingsession/' + this.state.tastingSessionId)
    .then((response) => {
        if(response.status === 200) {
          this.setState({
            tastingSessionName: response.data.name,
            tastingSessionStartingDate: new Date(response.data.startingDate),
            tastingSessionAdditionalInfo: response.data.additionalInfo,
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
      <Card className="shadow align-items-center">
        <Card.Img variant="top" src={beerImg}  style={{ width: '13rem' }} />
        <Card.Body>
          <Card.Title>Olvi3</Card.Title>
          <Card.Text>Saatana</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  render() {

    let beerCard = this.createRateBeerCard(0);

    return (
      <Container id="tastingsession-container" className="rounded">
        <Row id="title-date-row">
            <Col>
              <h1 className="ml-4">{this.state.tastingSessionName}</h1>
            </Col>
            <Col>
              <p className="text-right mr-4">{moment(this.state.tastingSessionStartingDate).format(DATE_FORMAT)}</p>
            </Col>
        </Row>
        <Row className="justify-content-center">
          <h1>
            Information:
          </h1>
        </Row>
        <Row className="justify-content-center">
        <div className="border rounded shadow-sm p-3 mb-5 bg-white rounded w-75" align="center">
            {this.state.tastingSessionAdditionalInfo}
          </div>
        </Row>
        <Row className="justify-content-center">
          <h1>Drinks:</h1>
        </Row>
        <Row className="justify-content-center">
        <ul className="list-group list-group-flush bg-light w-75">
          <li className="list-group-item">{beerCard}</li>
          <li className="list-group-item">{beerCard}</li>
        </ul>
        </Row>
      </Container>
    );
  }

}

export default TastingSessionView;