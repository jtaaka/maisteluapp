import React, {Component} from 'react';

import {Card} from 'react-bootstrap';

import beerImg from '../img/testbeer.png';

const DESCRIPTION_MAX_LENGTH = 25;

class BeerCard extends Component {

    constructor(props) {
      super(props);

      this.state = {
        beerName: this.props.beerName != null ? this.props.beerName : "",
        description: this.props.description != null ? this.props.description : "",
        alcoholPercent: this.props.alcoholPercent != null ? this.props.alcoholPercent : 0.0
      }
    }

    componentDidMount() {
     if(this.state.description.length >= DESCRIPTION_MAX_LENGTH) {
        let newDesc = this.limitDescriptionLength(this.state.description);
        this.setState({description: newDesc});
      }
    }

    limitDescriptionLength(description) {
      return description.slice(0, DESCRIPTION_MAX_LENGTH) + '...';
    }

    render() {
        return(
          <Card className="beerCard shadow" style={{ width: '13rem' }}>
            <Card.Img variant="top" src={beerImg} />
            <Card.Body>
              <Card.Title>{this.state.beerName}</Card.Title>
              <Card.Text>{this.state.description}</Card.Text>
            </Card.Body>
          </Card>
        );
    }
}

export default BeerCard;