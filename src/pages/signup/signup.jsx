import React, { Component } from "react";
import { Button, Form, Container, Row, Col} from "react-bootstrap";
import './signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {username: "", password:  ""};
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.username.length < 20;
    }

    handleChange = event => {
        if(event.target.id === "username"){
            this.setState({username: event.target.value});
        }

        if(event.target.id === "password"){
            this.setState({password: event.target.value});
        }
        console.log(this.state.username);
    }

    handleSubmit = event => {
        event.preventDefault();

        let success = data => {
            window.location.hash = "#login";
        }

        let error = error => {
            console.log(error);
        }
        console.log(this.state.username + "  " + this.state.password);

        const url = "http://localhost:8080/users/";
        const data = {username: this.state.username, password: this.state.password};
        const params = {
            headers:{
                "content-type": "application/json; charset=UTF-8"
            },
            body: data,
            method: "PUT",
            mode: "cors"
        }

        console.log(params.body);

        fetch(url, params)
            .then(success())
            .catch(error())


    }





    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Row className="justify-content-md-center">
                            <h2>Register</h2>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={5}>
                                <Form.Control
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={this.state.username}
                                    onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={5}>
                                <Form.Control
                                    id="password"
                                    type="secret"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.handleChange}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Row className="justify-content-md-center">
                        <Col xs={5}>
                            <Button
                                variant ="primary"
                                block
                                disabled={!this.validateForm()}
                                type="submit">
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default Signup;