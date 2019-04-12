import React, { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";

import {BACKEND_URL} from '../../GlobalConfig';
import {withRouter} from "react-router-dom";
import Cookies from "js-cookie";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: "", alert: false};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  validateForm() {
    return this.state.username.match(/^[a-z0-9\-_.]+$/i) !== null
      && this.state.username.length > 0
      && this.state.username.length < 20
      && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value} );
  };

  handleSubmit = event => {
    event.preventDefault();

    let requestBody = {
      username: this.state.username,
      password: this.state.password
    };

    let parent = this;

    fetch(BACKEND_URL + 'auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    })
    .then(function(response) {
      if(response.status === 200) {
        console.log("SUCCESS");
        response.json().then(function(json){
          Cookies.set("token", json.token);
          Cookies.set("username", json.user);
          Cookies.set("userId", json.id);
          parent.props.history.push("/tastingapp");
        });

      } else if(response.status === 401) {
        parent.setState({alert: true})
      }
    });
    //this.props.history.push('/tastingapp');
  };

  showAlert() {
    if (this.state.alert) {
      return (
        <Alert variant="danger">
          Invalid username or password
        </Alert>
      )
    } 
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <h2>Log in</h2>
          <Form.Control
            className="loginAndSignupFormControl"
            type="text"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            className="loginAndSignupFormControl"
            type="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}/>
        </Form.Group>
        {this.showAlert()}
          <Button
            variant ="success"
            block
            disabled={!this.validateForm()}
            type="submit">
            Log in
          </Button>
      </Form>
    );
  }
}

export default withRouter(Login);
