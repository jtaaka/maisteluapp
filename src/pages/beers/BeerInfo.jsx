import React, {Component} from 'react';
import {Container, Row, Alert, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import axios from 'axios';

import beerImg from '../../img/testbeer.png';

import './BeerInfo.css';

class BeerInfo extends Component {

    constructor(props) {
        super(props);
        this.beerInfoColumn = this.beerInfoColumn.bind(this);
        this.state = {
            beer: [],
            ratings: []
        }

        this.calculateRatingMediumForBeer = this.calculateRatingMediumForBeer.bind(this);
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

        axios.get('rating/' + this.props.match.params.id)
            .then(response => {
                if(response.status === 200) {
                    this.setState({ratings: response.data});
                }
            })
            .catch(function(response) {
                console.log(response);
            });
    }

    calculateRatingMediumForBeer() {
        let medium = null;
        let count = 0;

        console.log(this.state.ratings)

        this.state.ratings.map((rating) => {
            if (rating.beerId === this.state.beer.id) {
                medium += rating.ratingValue;
                count++;
            }
        });

        if (medium !== null) {
            return "Overall rating " + medium / count + " / 5";
        } else {
            return "No ratings yet!"
        }
    }

    beerInfoColumn(){
      return (
        <h1>{this.state.beer.beerName}</h1>
      )
    }

    render() {
        
        console.log(this.props.match.params.id);

        return (
            <Container id="beerInfo" className="rounded">
            <Navbar>
                <Nav id="borderless" variant="tabs" className="ml-auto" activeKey="1">
                    <NavDropdown title="Manage beer" id="basic-nav-dropdown">
                    <LinkContainer to="/" exact={true}>
                        <NavDropdown.Item>Delete beer</NavDropdown.Item>
                    </LinkContainer>
                    
                    <LinkContainer to="/" exact={true}>
                        <NavDropdown.Item>Modify beer</NavDropdown.Item>
                    </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
                <Row className='justify-content-center'>
                    <img className="d-block w-30" src={axios.defaults.baseURL + 'images/get/' + this.props.match.params.id} width="300" height="400" alt="beerImage"/>
                </Row>

                <Row className="justify-content-center">
                    <Alert variant='dark'>
                        {this.calculateRatingMediumForBeer()}
                    </Alert>
                </Row>

                <Row className="justify-content-center">
                    <h2>{this.state.beer.beerName} {this.state.beer.alcoholPercent}‰</h2>
                </Row>

                <Row className="justify-content-center">
                    <h4>{this.state.beer.description}</h4>
                </Row>
            </Container>
        )
    }

}

export default BeerInfo;

