import React, {Component} from 'react';

import {Container, Row, Col, Button} from 'react-bootstrap';

import axios from 'axios';

import './TastingSessionView.css';
import User from '../../../User';

class TastingSessionView extends Component {

  constructor(props) {
    super(props);

    let passedParameters = props.location.state;

    this.state = {
      tastingSessionId: passedParameters.tastingSessionId != null ? passedParameters.tastingSessionId : -1,
      user: new User(),
      tastingSessionName: '',
      tastingSessionStartingDate: new Date(),
      tastingSessionAdditionalInfo: '',
      tastingSessionBeers: []
    };

    console.log(this.state.user.getIsUserJoinedInSession(this.state.tastingSessionId) + " HAHA");
  }

  componentWillMount() {
    axios.get(
      'tastingsession/' + this.state.tastingSessionId
    ).then((response) => {
      if(response.status === 200) {
        this.setState({
          tastingSessionName: response.data.name,
          tastingSessionStartingDate: new Date(response.data.startingDate),
          tastingSessionAdditionalInfo: response.data.tastingSessionAdditionalInfo,
          tastingSessionsBeers: response.data.beers
        });
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  createJoinOrQuitSessionButton() {

  }

  render() {
    return (
      <Container id="tastingsession-container" className="rounded">
        <h1>{this.state.tastingSessionName}</h1>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button>Join</Button>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default TastingSessionView;