import React, {Component} from 'react';

import {Container} from 'react-bootstrap';

import axios from 'axios';

import './TastingSessionView.css';
import User from '../../../User';

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
      tastingSessionBeers: []
    };

    console.log(this.state.tastingSessionId + " ID");
    console.log(this.state.user.username + " USER");
  }

  componentWillMount() {
    axios.get('tastingsession/' + this.state.tastingSessionId)
    .then((response) => {
        if(response.status === 200) {
          this.setState({
            tastingSessionName: response.data.name,
            tastingSessionStartingDate: response.data.startingDate,
            tastingSessionAdditionalInfo: response.data.tastingSessionAdditionalInfo,
            tastingSessionBeers: response.data.beers
          });
        }
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Container id="tastingsession-container" className="rounded">
        <h1>{this.state.tastingSessionName}</h1>
      </Container>
    );
  }

}

export default TastingSessionView;