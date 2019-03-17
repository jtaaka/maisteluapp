import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
