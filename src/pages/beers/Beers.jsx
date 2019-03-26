import React, {Component} from 'react';
import {Container, Form, InputGroup, Button, Col, Row} from 'react-bootstrap';

import axios from 'axios';

import BeerCard from '../../components/BeerCard';

import './Beers.css';

import { Link } from "react-router-dom";

class Beers extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            listOfBeers: []
        }
    }

    componentWillMount() {
        axios.get(
            'beers/'
        )
        .then(response => {
            if(response.status === 200) {
                this.setState({listOfBeers: response.data});
                console.log(response.data);
                console.log(this.state.listOfBeers);
            }
        })
        .catch(function(response) {
            console.log(response);
        });
    }

    render() {
        const beerCards = this.state.listOfBeers.map((d) =>
                <li className="beerItem">
                  <Link style={{ textDecoration: 'none' }} to={"/tastingapp/beers/" + d.id}>
                    <BeerCard 
                      beerName={d.beerName}
                      description={d.description}
                      alcoholPercent={d.alcoholPercent}
                    />
                  </Link>
                </li>
        );

        return (
          <Container>
            <div id="beersPage" className="rounded">
              <h1 id="beersH1">Beers</h1>
              <div id="beerSearch">
                <Row className="justify-content-md-center">
                  <Col id="searchColumn" xl={7} xs={12}>
                    <InputGroup id="searchInputGroup">
                      <Form.Control type="text" placeholder="TODO"></Form.Control>
                      <Button>Search</Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
              <ul id="beerCardsList">
                {beerCards}
              </ul>
            </div>
          </Container>
        );
    }

}

export default Beers;

