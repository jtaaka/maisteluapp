import React, {Component} from 'react';
import {Container, Form, InputGroup, Col, Row} from 'react-bootstrap';

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
    }

    componentWillMount() {
        axios.get(
            'beers/'
        )
        .then(response => {
            if(response.status === 200) {
                this.setState({
                  listOfBeers: response.data,
                  filteredBeers: response.data
                });
            }
        })
        .catch(function(response) {
            console.log(response);
        });
    }

    search(e) {
        let filtered = [];

        filtered = this.state.listOfBeers.filter((beer) => {
          return beer.beerName.toLowerCase().includes(e.target.value.toLowerCase());
        });

        this.setState({filteredBeers: filtered});
    }

    render() {
      const beerListItems = this.state.filteredBeers.map((beer) =>
        <li key={beer.id} className="beerItem">
          <Link style={{ textDecoration: 'none' }} to={"/tastingapp/beers/" + beer.id}>
            <BeerCard 
              beerId={beer.id}
              beerName={beer.beerName}
              description={beer.description}
              alcoholPercent={beer.alcoholPercent}
            />
          </Link>
        </li>
      );

        return (
          <Container id="beers-page-container" className="rounded">
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
                  {beerListItems}
              </ul>
            </div>
          </Container>
        );
    }
}

export default Beers;

