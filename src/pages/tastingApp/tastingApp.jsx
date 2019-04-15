import React, {Component} from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Carousel } from 'react-bootstrap';
import './tastingApp.css';
import beerImg from '../../img/testbeer.png';
import {beerImageOnError} from "../../GlobalConfig";

const cardStyle = {marginTop: '10px', marginBottom: '10px'};

class TastingApp extends Component {
  constructor(props) {
    super(props);

    this.state = {upcomingSessions: [], latestAddedBeers: []};

    this.getUpcomingSessions = this.getUpcomingSessions.bind(this);
    this.getLatestBeer = this.getLatestBeer.bind(this);
    this.compareDates = this.compareDates.bind(this);
  }

  componentDidMount() {
    this.getUpcomingSessions();
    this.getLatestBeer();
  }

  compareDates(DBdate) {
    let dateFromDB = DBdate.split(/[.,\/ -]/);
    let today = new Date();

    let DBday = parseInt(dateFromDB[0]);
    let DBmonth = parseInt(dateFromDB[1]);
    let DByear = parseInt(dateFromDB[2]);
    let DBhours = parseInt(dateFromDB[3]);

    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();
    let currentHours = today.getHours();

    if ( DByear > currentYear
        || (DByear === currentYear && DBmonth > currentMonth)
        || (DByear === currentYear && DBmonth === currentMonth && DBday > currentDay)
        || (DByear === currentYear && DBmonth === currentMonth && DBday === currentDay && DBhours >= currentHours)) {

      return true;
    }

    return false;
  }

  getUpcomingSessions() {
    let arrayOfSessions = [];
    
    axios.get(
      'tastingsession/'
    )
      .then(response => {
        if (response.status === 200 && response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            if (this.compareDates(response.data[i].startingDate)) {
              arrayOfSessions.push(response.data[i]);
            }
          }
          if (arrayOfSessions.length !== 0) {
            this.setState({upcomingSessions: arrayOfSessions});
          } else {
            this.setState({ upcomingSessions: [{additionalInfo: "No upcoming sessions."}] });
          }
        } else {
          this.setState({ upcomingSessions: [{additionalInfo: "No upcoming sessions."}] });
        }
      }
    );
  }

  getLatestBeer() {
    axios.get(
      'beers/'
    )
    .then(response => {
      if (response.status === 200 && response.data.length > 0)
        this.setState({ latestAddedBeers: response.data.splice(-3, 3) });
      else
        this.setState({ latestAddedBeers: [{description: "No added beers yet."}] });
      }
    );
  }

  showLatestBeers(name, id, description, alcoholPercent) {
    return (
      <Carousel.Item key={name}>
        <img
          className="d-block w-100"
          width="300"
          height="400"
          style={{opacity: 0.7}}
          onError={beerImageOnError}
          src={axios.defaults.baseURL + 'images/get/' + id}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>{alcoholPercent}%</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  }

  // TODO: Sort upcoming sessions by date (?)

  render() {
    const latestBeers = this.state.latestAddedBeers.map((beer) => 
      this.showLatestBeers(beer.beerName, beer.id, beer.description, beer.alcoholPercent)
    );

    return (
      <Container>
        <Row id="header">
        <h1>Upcoming sessions</h1>
        </Row>
        
        <Row>
          <Col xs={11} sm={11} md={8} lg={6} xl={5}>
            {this.state.upcomingSessions.map( sessions =>
            <Card key={sessions.id} bg="dark" text="white" style={cardStyle}>
              <Card.Header><h5>{sessions.startingDate}</h5></Card.Header>
              <Card.Body>
              <Card.Title>{sessions.name}</Card.Title>
                {sessions.additionalInfo}
              </Card.Body>
            </Card>)}
          </Col>
        </Row>

        <Row id="header">
        <h1>Latest added beers</h1>
        </Row>

        <Row style={{marginBottom: '10px'}}>
          <Col xs={11} sm={11} md={8} lg={6} xl={5}>
            <Carousel>
              {latestBeers}
            </Carousel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TastingApp;
