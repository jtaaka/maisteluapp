import React, {Component} from "react";
import {Navbar, Nav, NavDropdown, Image, Button} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import { Redirect } from 'react-router-dom';
import { removeCookies } from './../authorization/Auth';
import profileIcon from '../img/profile-icon-test.png';
import beerIcon from '../img/beericon.png';
import './navigation.css';

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

  handleSelect(eventKey) {
    console.log({eventKey})
  }

  render() {
    if (window.location.pathname === '/login') {
      return null;
    } else {
      return (
        <div>
          {this.renderLogout()}
          <Navbar expand="md" bg="dark" variant="dark" collapseOnSelect="true">
          
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                style={{marginRight: "10px"}}
                alt=""
                src={beerIcon}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />
                Tasting app
                </Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              
              <Nav variant="tabs" className="mr-auto" activeKey="1" onSelect={k => this.handleSelect(k)}>
                <LinkContainer to={"/tastingsessions"} exact={true}>
                  <Nav.Link>Tasting Sessions</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/tastingapp/beers/" exact={true}>
                  <Nav.Link>Beers</Nav.Link>
                </LinkContainer>
              </Nav>

              <Nav variant="tabs" className="ml-auto" activeKey="1" onSelect={k => this.handleSelect(k)}>

                <NavDropdown title="Manage app" id="basic-nav-dropdown">
                  <LinkContainer to="/tastingapp/beers/add" exact={true}>
                    <NavDropdown.Item>Add beer</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to="/tastingsessions/create" exact={true}>
                    <NavDropdown.Item>Create tasting session</NavDropdown.Item>
                   </LinkContainer>
                </NavDropdown>

                <LinkContainer to="/profile/profile" exact={true}>
                  <Nav.Link><Image alt="" src={profileIcon} width="30" height="30" /></Nav.Link>
                </LinkContainer>

                <Nav.Item>
                  <Button
                    variant="outline-danger" 
                    onClick={this.handleLogOut}>
                    Log out
                  </Button>
                </Nav.Item>

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  }
}
