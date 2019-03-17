import React, { Component } from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import './navigation.css'

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {loggedIn: true}
  }

  logOut = () => {
    this.setState({loggedIn: false})
  }

  render() {

      if (!this.state.loggedIn) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="#">Maisteluapp</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="#">title 1</Nav.Link>
              <Nav.Link href="#">title 2</Nav.Link>
              <Nav.Link href="#">title 3</Nav.Link>
              <Nav.Link href="#">title 4</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-info" onClick={this.logOut}>Log out</Button>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
