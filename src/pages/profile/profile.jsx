import React, {Component} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import User from "../../User";
import axios from 'axios';

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
        }

        this.getJoinedSessionsById = this.getJoinedSessionsById.bind(this);
        this.getBeerIds = this.getBeerIds.bind(this);
        this.getAllUserRatingsByBeerId = this.getAllUserRatingsByBeerId.bind(this);
        this.compareDates = this.compareDates.bind(this);
    }

    componentDidMount() {
        this.state.user.updateJoinedSessions(this.getJoinedSessionsById);
        this.getBeerIds();
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
                        console.log(response.data);
                    }
                })
                .catch(function (response) {
                    console.log(response);
                }));
    }

    getBeerIds() {
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
                this.setState({ratings: [...this.state.ratings, response.data]});
                console.log(this.state.ratings);
            })
        })
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

    render() {

        return (

            <Container>
                <Row id="header">
                    <h1>Your Upcoming Sessions</h1>
                </Row>

                <Row>
                    <Col xs={11} sm={11} md={8} lg={6} xl={5}>
                        {this.state.upcomingSessions.map( session =>
                            <Card key={session.id} bg="dark" text="white" style={cardStyle}>
                                <Card.Header><h5>{session.startingDate}</h5></Card.Header>
                                <Card.Body>
                                    <Card.Title>{session.name}</Card.Title>
                                    {session.additionalInfo}
                                </Card.Body>
                            </Card>)}
                    </Col>
                </Row>

                <Row id="header">
                    <h1>Your Past Sessions</h1>
                </Row>

                <Row>
                    <Col xs={11} sm={11} md={8} lg={6} xl={5}>
                        {this.state.pastSessions.map( session =>
                            <Card key={session.id} bg="dark" text="white" style={cardStyle}>
                                <Card.Header><h5>{session.startingDate}</h5></Card.Header>
                                <Card.Body>
                                    <Card.Title>{session.name}</Card.Title>
                                    {session.additionalInfo}
                                </Card.Body>
                            </Card>)}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;

