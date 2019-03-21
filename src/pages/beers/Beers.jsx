import React, {Component} from 'react';
import {Container, Row, Col, CardColumns, CardGroup} from 'react-bootstrap';

import axios from 'axios';

import BeerCard from '../../components/BeerCard';

import './Beers.css';

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
                <BeerCard 
                    beerName={d.beerName}
                    slogan="Amazing beer from finland.."
                    alcoholPercent={d.alcoholPercent}
                />
                </li>
        );

        return (
          <Container>
            <div id="beersPage" >
              <h1 id="beersH1">Beers</h1>
              <ul id="beerCardsList">
                {beerCards}
              </ul>
            </div>
          </Container>
        );
    }

}

export default Beers;

