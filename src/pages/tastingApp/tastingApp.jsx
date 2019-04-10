import React, {Component} from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './tastingApp.css';

const cardStyle = {marginTop: '10px', marginBottom: '10px'};

class TastingApp extends Component {
  constructor(props) {
    super(props);

    this.state = {upcomingSessions: [], latestAddedBeer: []};

    this.getUpcomingSessions = this.getUpcomingSessions.bind(this);
    this.getLatestBeer = this.getLatestBeer.bind(this);
    this.compareDates = this.compareDates.bind(this);
  }

  compareDates(DBdate) {
    var dateFromDB = DBdate.split(/[.,\/ -]/);
    var today = new Date();

    var DBday = parseInt(dateFromDB[0]);
    var DBmonth = parseInt(dateFromDB[1]);
    var DByear = parseInt(dateFromDB[2]);

    var currentDay = today.getDate();
    var currentMonth = today.getMonth() + 1;
    var currentYear = today.getFullYear();

    if ( DByear > currentYear 
        || (DByear === currentYear && DBmonth > currentMonth) 
        || (DByear === currentYear && DBmonth == currentMonth && DBday >= currentDay )) {
      
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
          this.setState({ upcomingSessions: arrayOfSessions });
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
        this.setState({ latestAddedBeer: response.data.splice(-3, 3) });
      else
        this.setState({ latestAddedBeer: [{description: "No added beers yet."}] });
      }
    );
  }

  componentDidMount() {
    this.getUpcomingSessions();
    this.getLatestBeer();
  }

  /* TODO:

  - Sort upcoming sessions by date (?)
  - Make this look a lot better (<Carousel/> for beers ?)

  */

  render() {
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
              <Card.Text>
                {sessions.additionalInfo}
              </Card.Text>
            </Card.Body>
          </Card>)}
          </Col>
        </Row>

        <Row id="header">
        <h1>Latest added beers</h1>
        </Row>

        <Row>
          <Col xs={11} sm={11} md={8} lg={6} xl={5}>
          {this.state.latestAddedBeer.map( beers =>
          <Card key={beers.id} bg="dark" text="white" style={cardStyle}>
            <Card.Header><h5>{beers.beerName}</h5></Card.Header>
            <Card.Body>
              <Card.Text>
                {beers.description}
                {beers.alcoholPercent && <p>Alcohol: {beers.alcoholPercent}%</p>}
              </Card.Text>
            </Card.Body>
          </Card>)}
          </Col>
        </Row>

      </Container>
    );
  }
}

export default TastingApp;
