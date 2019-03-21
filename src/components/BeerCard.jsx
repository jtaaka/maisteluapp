import React, {Component, Image} from 'react';

import {Card, Button} from 'react-bootstrap';

import beerImg from '../img/testbeer.png';

const DESCRIPTION_MAX_LENGTH = 60;

class BeerCard extends Component {

    constructor(props) {
      super(props);

      this.state = {
        beerName: this.props.beerName != null ? this.props.beerName : "",
        slogan: this.props.slogan != null ? this.props.slogan : "",
        alcoholPercent: this.props.alcoholPercent != null ? this.props.alcoholPercent : 0.0
      }
    }

    componentDidMount() {
     /* if(this.state.description.length >= DESCRIPTION_MAX_LENGTH) {
        console.log(this.state.description);
        let newDesc = this.limitDescriptionLength(this.state.description);
        console.log(newDesc + " STAGTE NOW");
        this.setState({description: newDesc});

      }*/
    }

    limitDescriptionLength(description) {
      return description.slice(0, DESCRIPTION_MAX_LENGTH) + '...';
      console.log("DONE");
    }

    render() {
        return(
          <Card className="beerCard" style={{ width: '15rem' }}>
            <Card.Img variant="top" src={beerImg} />
            <Card.Body>
              <Card.Title>Karhu</Card.Title>
              <Card.Text className="beerSlogan">
                Some quick example text to build on the card title and make up the bulk of
                the card's content.sssssssssssssadasdasdasdasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
              </Card.Text>
            </Card.Body>
          </Card>
        );
    }
}

export default BeerCard;