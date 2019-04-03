import React, {Component} from 'react';

import {Container} from 'react-bootstrap';

import './TastingSessionView.css';
import User from '../../../User';

class TastingSessionView extends Component {

  constructor(props) {
    super(props);

    let passedParameters = props.location.state;

    this.state = {
      tastingSessionId: passedParameters.tastingSessionId != null ? passedParameters.tastingSessionId : -1,
      user: passedParameters.user != null ? passedParameters.user : new User()
    };

    console.log(this.state.tastingSessionId + " ID");
    console.log(this.state.user.username + " USER");
  }

  render() {
    return (
      <Container>
        <p>HELLO</p>
      </Container>
    );
  }

}

export default TastingSessionView;