import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import User from "../../User";
import axios from 'axios';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: new User(),
            joinedSessions: []
        }

        this.getJoinedSessionsById = this.getJoinedSessionsById.bind(this);
    }

    componentDidMount() {
        this.state.user.updateJoinedSessions(this.getJoinedSessionsById);
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

    render() {
        return (
            <Container>
            </Container>
        );
    }

}

export default Profile;

