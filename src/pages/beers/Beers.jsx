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
        /*const beerCards = this.state.listOfBeers.map((d) => 
                <BeerCard 
                    beerName={d.beerName}
                    description={d.description}
                    alcoholPercent={d.alcoholPercent}
                />
        );*/

        const beerCards = [];
        for(let i = 0; i < 20; i++) {
          beerCards[i] = <BeerCard 
                            beerName="{d.beerName"
                            description="d.description"
                            alcoholPercent="5"
                        />;
        }

        return (
          <Container>
            <div id="beersPage" >
              <h1 id="beersH1">Beers</h1>
              <CardColumns id="beersCardColumns">
                {beerCards}
              </CardColumns>
            </div>
          </Container>
        );
    }

}

export default Beers;

