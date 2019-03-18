import React, { Component } from "react";
import { Button, Form, Container, Row, Col} from "react-bootstrap";

import { Redirect } from 'react-router-dom'
import {BACKEND_URL} from '../../GlobalConfig';
import {withRouter} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.username.match(/^[a-z0-9\-_.]+$/i) !== null
      && this.state.username.length > 0
      && this.state.username.length < 20
      && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});

  }

  handleSubmit = event => {
    event.preventDefault();

    let requestBody = {
      username: this.state.username,
      password: this.state.password
    };

    fetch(BACKEND_URL + 'users/login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    })
    .then(function(response) {
      if(response.status === 200) {
        console.log("SUCCESS");
      } else if(response.status === 401) {
        alert("Invalid username or password");
      }
    })
    this.props.history.push('/tastingapp');
  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username">
            <Row className="justify-content-md-center">
              <h2>Log in</h2>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.handleChange}/>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="password">
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <Form.Control
                  type="password"
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
                Log in
              </Button>
            </Col>
          </Row>
        </Form>
    );
  }
}

export default withRouter(Login);
