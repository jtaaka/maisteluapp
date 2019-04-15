import React, { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { BACKEND_URL } from '../../GlobalConfig';
import { withRouter } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: "", alert: false};

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

    let reqBody = {username: this.state.username, password: this.state.password};

    fetch(BACKEND_URL + 'users/', {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(reqBody)
    })
    .then(response => {
      if (response.status === 200)
        this.props.history.push("/");
      else if (response.status === 409)
        this.setState({alert: true});
      }
    );
  }

  showAlert() {
    if (this.state.alert) {
      return (
        <Alert variant="danger">
          Username is already taken
        </Alert>
      )
    } 
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <h2>Sign up</h2>
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
            variant ="primary"
            block
            disabled={!this.validateForm()}
            type="submit">
            Sign up
          </Button>
      </Form>
    );
  }
}

export default withRouter(Signup);
