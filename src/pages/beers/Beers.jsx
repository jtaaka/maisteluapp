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
            listOfBeers: [],
            filteredBeers: []
        }

        this.search = this.search.bind(this);
        this.renderBeers = this.renderBeers.bind(this);
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
        }).then(() => this.setState({filteredBeers: this.state.listOfBeers}))
        .catch(function(response) {
            console.log(response);
        });
    }

    search(e) {
        let filtered = [];

        this.state.listOfBeers.map( (beer) => {
            if (beer.beerName.toLowerCase().includes(e.target.value)) {
                filtered = [...filtered, beer];
            }
        });


        this.setState({filteredBeers: filtered})
    }

    renderBeers() {
        return (
            this.state.filteredBeers.map((beer) =>
                <li className="beerItem">
                    <Link style={{ textDecoration: 'none' }} to={"/tastingapp/beers/" + beer.id}>
                        <BeerCard
                            beerName={beer.beerName}
                            description={beer.description}
                            alcoholPercent={beer.alcoholPercent}
                        />
                    </Link>
                </li>));
    }

    render() {

        return (
          <Container>
            <div id="beersPage" className="rounded">
              <h1 id="beersH1">Beers</h1>
              <div id="beerSearch">
                <Row className="justify-content-md-center">
                  <Col id="searchColumn" xl={7} xs={12}>
                    <InputGroup id="searchInputGroup">
                      <Form.Control type="text" placeholder="Search..." onChange={this.search}/>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
              <ul id="beerCardsList">
                  {this.renderBeers()}
              </ul>
            </div>
          </Container>
        );
    }
}

export default Beers;

