import React, {Component} from 'react';
import {Card, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import User from "../../User";
import axios from 'axios';
import beerImg from '../../img/testbeer.png';
import './profile.css'


const cardStyle = {marginTop: '10px', marginBottom: '10px'};

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: new User(),
            upcomingSessions: [],
            pastSessions: [],
            beers: [],
            ratings: []
        };

        this.getJoinedSessionsById = this.getJoinedSessionsById.bind(this);
        this.getBeers = this.getBeers.bind(this);
        this.getAllUserRatingsByBeerId = this.getAllUserRatingsByBeerId.bind(this);
        this.compareDates = this.compareDates.bind(this);
        this.ratingBeerName = this.ratingBeerName.bind(this);
        this.renderRatings = this.renderRatings.bind(this);
        this.renderUpcomingSessions = this.renderUpcomingSessions.bind(this);
        this.renderPastSessions = this.renderPastSessions.bind(this);
    }

    componentDidMount() {
        this.state.user.updateJoinedSessions(this.getJoinedSessionsById);
        this.getBeers();
    }

    getJoinedSessionsById() {
        this.state.user.usersJoinedSessions.map((sessionId) =>
            axios.get('tastingsession/' + sessionId)
                .then(response => {
                    if (response.status === 200) {
                        if (this.compareDates(response.data.startingDate)) {
                            this.setState({upcomingSessions: [...this.state.upcomingSessions, response.data]});
                        } else {
                            this.setState({pastSessions: [...this.state.pastSessions, response.data]})
                        }
                    }
                })
                .catch(function (response) {
                    console.log(response);
                }));
    }

    getBeers() {
        axios.get('beers/')
            .then(response => {
                if (response.status === 200) {
                    this.setState({beers: response.data});
                }
            }).then(() => this.getAllUserRatingsByBeerId())
            .catch(function (response) {
                console.log(response);
            });
    }

    getAllUserRatingsByBeerId() {
        this.state.beers.map((beer) => {
            this.state.user.getRating(beer.id).then((response) => {
                if (response.data !== "") {
                    this.setState({ratings: [...this.state.ratings, response.data]});
                    console.log(this.state.ratings);
                }
            })
        });
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

    ratingBeerName(beerId) {
        for(let i = 0; i < this.state.beers.length; i++) {
            if (beerId === this.state.beers[i].id) {
                return this.state.beers[i].beerName;
            }
        }
    }

    renderRatings() {
        if (this.state.ratings.length !== 0) {
            return (
                this.state.ratings.map( rating =>
                    <Card key={rating.id} bg="dark" text="white" style={cardStyle}>
                        <Card.Header>{<img className="d-block w-100" src={beerImg} alt="beerImage"/>}</Card.Header>
                        <Card.Body>
                            <Card.Title>{this.ratingBeerName(rating.beerId) + " " + rating.ratingValue + " / 5"}</Card.Title>
                            {rating.comment}
                        </Card.Body>
                    </Card>)
            );
        } else {
            return (
                    <Card key="no-ratings" bg="dark" text="white" style={cardStyle}>
                        <Card.Header/>
                        <Card.Body>You have not rated anything yet!</Card.Body>
                    </Card>
            );
        }
    }

    renderUpcomingSessions() {
        if (this.state.upcomingSessions.length !== 0) {
            return (
                this.state.upcomingSessions.map(session =>
                    <Card key={session.id} bg="dark" text="white" style={cardStyle}>
                        <Card.Header><h5>{session.startingDate}</h5></Card.Header>
                        <Card.Body>
                            <Card.Title>{session.name}</Card.Title>
                            {session.additionalInfo}
                        </Card.Body>
                    </Card>
                )
            );
        } else {
            return (
                <Card key="no-past-sessions" bg="dark" text="white" style={cardStyle}>
                    <Card.Header/>
                    <Card.Body>You have no upcoming sessions!</Card.Body>
                </Card>
            );
        }
    }

    renderPastSessions() {
        if (this.state.pastSessions.length !== 0) {
            return (
                this.state.pastSessions.map(session =>
                    <Card key={session.id} bg="dark" text="white" style={cardStyle}>
                        <Card.Header><h5>{session.startingDate}</h5></Card.Header>
                        <Card.Body>
                            <Card.Title>{session.name}</Card.Title>
                            {session.additionalInfo}
                        </Card.Body>
                    </Card>
                )
            );
        } else {
            return (
                <Card key="no-past-sessions" bg="dark" text="white" style={cardStyle}>
                    <Card.Header/>
                    <Card.Body>You have no past sessions!</Card.Body>
                </Card>
            );
        }
    }

    render() {

        return (
            <Container>
                <Tabs defaultActiveKey="sessions" id="profile-tabs">
                    <Tab eventKey="sessions" title="Your Sessions">
                        <Row id="header">
                            <h1>Your Upcoming Sessions</h1>
                        </Row>

                        <Row>
                            <Col xs={11} sm={11} md={8} lg={6} xl={5}>
                                {this.renderUpcomingSessions()}
                            </Col>
                        </Row>

                        <Row id="header">
                            <h1>Your Past Sessions</h1>
                        </Row>

                        <Row>
                            <Col xs={11} sm={11} md={8} lg={6} xl={5}>
                                {this.renderPastSessions()}
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="ratings" title="Your Ratings">
                        <Row id="header">
                            <h1>Your Ratings</h1>
                        </Row>

                        <Row>
                            <Col xs={11} sm={11} md={8} lg={6} xl={5}>
                                {this.renderRatings()}
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>;

            </Container>
        );
    }
}

export default Profile;

