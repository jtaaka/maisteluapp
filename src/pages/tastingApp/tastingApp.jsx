import React, {Component} from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './tastingApp.css';

const cardStyle = {width: '20rem', marginLeft: '10px', marginTop: '10px', marginBottom: '10px'};

class TastingApp extends Component {
  constructor(props) {
    super(props);

    this.state = {upcomingSessions: [], latestAddedBeer: []};

    this.getUpcomingSessions = this.getUpcomingSessions.bind(this);
    this.getLatestBeer = this.getLatestBeer.bind(this);
  }

  getUpcomingSessions() {
    axios.get(
      'tastingsession/'
    )
    .then(response => {
      if (response.status === 200 && response.data.length > 0)
        this.setState({ upcomingSessions: response.data });
      else
        this.setState({ upcomingSessions: "No upcoming sessions." });
      }
    );
  }

  getLatestBeer() {
    axios.get(
      'beers/'
    )
    .then(response => {
      if (response.status === 200 && response.data.length > 0)
        this.setState({ latestAddedBeer: response.data });
      else
        this.setState({ latestAddedBeer: "Where are all the beers?" });
      }
    );
  }

  componentDidMount() {
    this.getUpcomingSessions();
    this.getLatestBeer();
  }

  /*

  TODO:

  - Map only sessions that are in the future
  - Beers maybe in <Carousel/> component + map only like 3

  */

  render() {
    return (
      <Container>

        <Row id="header">
        <h1>Upcoming sessions</h1>
        </Row>
        
        <Row>
          {this.state.upcomingSessions.map( sessions =>
          <Card bg="dark" text="white" style={cardStyle}>
            <Card.Header><h5>{sessions.startingDate}</h5></Card.Header>
            <Card.Body>
            <Card.Title>{sessions.name}</Card.Title>
              <Card.Text>
                {sessions.additionalInfo}
              </Card.Text>
            </Card.Body>
          </Card>)}
        </Row>

        <Row id="header">
        <h1>Latest added beers</h1>
        </Row>

        <Row>
          {this.state.latestAddedBeer.map( beers =>
          <Card bg="dark" text="white" style={cardStyle}>
            <Card.Header><h5>{beers.beerName}</h5></Card.Header>
            <Card.Body>
              <Card.Text>
                <p>{beers.description}</p>
                <p>Alcohol: {beers.alcoholPercent}%</p> 
              </Card.Text>
            </Card.Body>
          </Card>)}
        </Row>

      </Container>
    );
  }
}

export default TastingApp;
