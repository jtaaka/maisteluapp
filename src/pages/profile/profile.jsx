import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import User from "../../User";
import axios from 'axios';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: new User(),
            joinedSessions: [],
            beers: [],
            ratings: []
        }

        this.getJoinedSessionsById = this.getJoinedSessionsById.bind(this);
        this.getBeerIds = this.getBeerIds.bind(this);
        this.getAllUserRatingsByBeerId = this.getAllUserRatingsByBeerId.bind(this);
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
                        this.setState({joinedSessions: [...this.state.joinedSessions, response.data]});
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

    render() {
        return (
            <Container>
            </Container>
        );
    }
}

export default Profile;

