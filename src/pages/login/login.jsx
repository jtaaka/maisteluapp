import React, { Component } from "react";
import { Button, Form, Container, Row, Col} from "react-bootstrap";
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: ""};
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.username.length < 20;
  }

  handleChange = event => {
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <Container>
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

export default Login;
