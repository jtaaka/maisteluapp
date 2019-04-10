import React, {Component} from "react";
import {Navbar, Nav, NavDropdown, Image} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import { Redirect } from 'react-router-dom';
import { removeCookies } from './../authorization/Auth';
import profileIcon from '../img/profile-icon-test.png';

export class Navigation extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
        logout: false
      };

      this.toggle = this.toggle.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
      this.renderLogout = this.renderLogout.bind(this);
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    handleLogOut = event => {
      console.log(Cookies.get("token"));
      removeCookies();
      console.log("removed");
      this.setState({"logout":true});
    };

    renderLogout(){
      if(this.state.logout){
        this.setState({"logout": false});
        return (<Redirect to="/login"/>);
      }
    }

    render() {
      /* Disbales navbar in login page */
      if (window.location.pathname === '/login') {
        return null;
      } else {
        return (
          <div>
            {this.renderLogout()}
          <Navbar expand="lg" bg="light" variant="light" collapseOnSelect="true">
            <LinkContainer to="/">
              <Navbar.Brand>Tasting app</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <LinkContainer to="/tastingsessions">
                    <Nav.Link>Tasting Sessions</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/tastingapp/beers/">
                    <Nav.Link>Beers</Nav.Link>
                  </LinkContainer>
                </Nav>

                <Navbar.Text>Signed in as: {Cookies.get("username")}</Navbar.Text>
                <LinkContainer to="/profile/profile">
                  <Nav.Link><Image alt="" src={profileIcon} width="30" height="30" /></Nav.Link>
                </LinkContainer>
                <NavDropdown title="Manage app" id="basic-nav-dropdown">
                <LinkContainer to="/tastingapp/beers/add">
                  <NavDropdown.Item>Add beer</NavDropdown.Item>
                </LinkContainer>
                  
                <LinkContainer to="/tastingsessions/create">
                  <NavDropdown.Item>Create tasting session</NavDropdown.Item>
                </LinkContainer>
                </NavDropdown>
              <Nav.Link onClick={this.handleLogOut}>Log out</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
        </div>
        );
      }
    }
  }

  /*
  <LinkContainer to="/tastingapp/beers">
                  <Nav.Link>Beers</Nav.Link>
                </LinkContainer>
                <Nav.Link>Item1</Nav.Link>
                <Nav.Link>Item2</Nav.Link>
                <Nav.Link>Item3</Nav.Link>*/