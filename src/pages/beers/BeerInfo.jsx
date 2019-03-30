import React, {Component} from 'react';
import {Container, Form, InputGroup, Button, Col, Row, Media} from 'react-bootstrap';

import axios from 'axios';

import beerImg from '../../img/testbeer.png';

import './BeerInfo.css';

class BeerInfo extends Component {

    constructor(props) {
        super(props);
        this.beerInfoColumn = this.beerInfoColumn.bind(this);
        this.state = {
            beer: []
        }
    }

    componentWillMount() {
        axios.get(
            'beers/' + this.props.match.params.id
        )
        .then(response => {
            if(response.status === 200) {
                this.setState({beer: response.data[0]});
                console.log(response.data);
                console.log(this.state.beer);
            }
        })
        .catch(function(response) {
            console.log(response);
        });
    }

    beerInfoColumn(){
      return (
        <h1>{this.state.beer.beerName}</h1>
      )
    }

    render() {
        
        console.log(this.props.match.params.id);

        return (
          <Container>
            <div id="beersPage" className="rounded">
            <Row className='justify-content-center'>
              <Media>
                <img
                  width={100}
                  height={100}
                  src={beerImg}
                  alt="Generic placeholder"
                />
              </Media>
            </Row>
            asdasd
            </div>
          </Container>
        )
    }

}

export default BeerInfo;

