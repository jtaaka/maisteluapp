import React, {Component} from 'react';
import {Container, Row, Alert, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import axios from 'axios';

import './BeerInfo.css';
import {beerImageOnError} from "../../GlobalConfig";

class BeerInfo extends Component {

    constructor(props) {
        super(props);
        this.beerInfoColumn = this.beerInfoColumn.bind(this);
        this.deleteBeer = this.deleteBeer.bind(this);
        this.modifyBeer = this.modifyBeer.bind(this);
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
            }
        })
        .catch(function(error) {
            console.log(error);
        });

        axios.get('rating/' + this.props.match.params.id)
            .then(response => {
                if(response.status === 200) {
                    this.setState({ratings: response.data});
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    calculateRatingMediumForBeer() {
        let medium = 0;
        let count = 0;

        this.state.ratings.forEach((rating) =>  {
            medium += rating.ratingValue;
            count++;
        })

        return medium / count;
    }

    beerInfoColumn(){
      return (
        <h1>{this.state.beer.beerName}</h1>
      )
    }

    deleteBeer(){

    }

    modifyBeer(){

    }

    render() {      
        return (
            <Container id="beerInfo" className="rounded">
            <Navbar>
                <Nav id="borderless" variant="tabs" className="ml-auto" activeKey="1">
                    <NavDropdown title="Manage beer" id="basic-nav-dropdown">
                    <LinkContainer to="/" exact={true} onClick={this.deleteBeer}>
                        <NavDropdown.Item>Delete beer</NavDropdown.Item>
                    </LinkContainer>
                    
                    <LinkContainer to="/" exact={true} onClick={this.modifyBeer}>
                        <NavDropdown.Item>Modify beer</NavDropdown.Item>
                    </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
                <Row className='justify-content-center'>
                    <img className="d-block w-30" onError={beerImageOnError} src={axios.defaults.baseURL + 'images/get/' + this.props.match.params.id} width="300" height="400" alt="beerImage"/>
                </Row>

                <Row className="justify-content-center">
                    <Alert variant='dark'>
                        {this.calculateRatingMediumForBeer() !== 0 ? "Overall rating: " + this.calculateRatingMediumForBeer() : "No ratings yet"}
                    </Alert>
                </Row>

                <Row className="justify-content-center">
                    <h2 id="header2">{this.state.beer.beerName} {this.state.beer.alcoholPercent}%</h2>
                </Row>

                <Row className="justify-content-center">
                    <h4 id="header4">{this.state.beer.description}</h4>
                </Row>
            </Container>
        )
    }

}

export default BeerInfo;

