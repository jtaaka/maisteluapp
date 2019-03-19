import React, { Component } from 'react';
import { Col, Container, Button, Row} from "react-bootstrap";
import Login from '../../components/login/login';
import Signup from '../../components/signup/signup';
import "./loginAndSignup.css";

class LoginAndSignup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      header6Text: "Dont have an account? Click here to register:",
      switchFormsBtnText: "Sign up"
    };

    this.switchForms = this.switchForms.bind(this);
  }

  switchForms() {
    if (this.state.showLogin === true) {
      this.setState({
        showLogin: !this.state.showLogin,
        header6Text: "Already registered? Click here to log in:",
        switchFormsBtnText: "Log in"
      });
    } else {
      this.setState({
        showLogin: !this.state.showLogin,
        header6Text: "Dont have an account? Click here to register:",
        switchFormsBtnText: "Sign up"
      });
    }
  }

  render() {

    let currentForm;

    if (this.state.showLogin === true)
      currentForm = <Login/>;
    else
      currentForm = <Signup/>;

    return (
      <Container id="loginAndSignupContainer">
        {currentForm}
        <Row className="justify-content-md-center">
          <Col><h6>{this.state.header6Text}</h6>
            <Button variant ="info" onClick={this.switchForms} block>{this.state.switchFormsBtnText}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginAndSignup;
