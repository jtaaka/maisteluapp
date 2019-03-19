import React, {Component, Image} from 'react';

import {Card, Button} from 'react-bootstrap';

class BeerCard extends Component {

    constructor(props) {
      super(props);

      this.state = {
        beerName: this.props.beerName != null ? this.props.beerName : "",
        description: this.props.description != null ? this.props.description : "",
        alcoholPercent: this.props.alcoholPercent != null ? this.props.alcoholPercent : 0.0
      }
    }

    render() {
        return(
          <Card className="beerCard">
            <Card.Img variant="top" src="https://www.ultraliquors.co.za/images/cooldrinks/beer-at-ultraliquors.jpg" />
            <Card.Body>
              <Card.Title>{this.state.beerName}</Card.Title>
              <Card.Text>{this.state.description}</Card.Text>
              <Card.Text>{this.state.alcoholPercent}%</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );
    }
}

export default BeerCard;