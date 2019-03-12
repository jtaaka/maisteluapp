import React, { Component } from "react";
import { Button, Form, Container, Row, Col} from "react-bootstrap";
import './signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {username: "", password: ""};
  }

  validateForm() {
    return this.state.username.length > 0
      && this.state.username.length < 20
      && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    let reqBody = {username: this.state.username, password: this.state.password};

    fetch('http://localhost:8080/users/' , {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(reqBody)
    })
      .then((result) => result.json())
      .then((info) => {console.log(info)})
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username">
            <Row className="justify-content-md-center">
              <h2>Sign up</h2>
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
                Sign up
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default Signup;
