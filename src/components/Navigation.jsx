import React, {Component} from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";
import { Redirect } from 'react-router-dom';
import { NavObjects } from './NavObjects.js';
import { removeCookies } from './../authorization/Auth';


export class Navigation extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
      this.renderLogout = this.renderLogout.bind(this);
      this.renderLinks = this.renderLinks.bind(this);
      this.NavObjects = NavObjects;
      this.state = {
        isOpen: false,
        logout: false
      };
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

    renderLinks(){
      //console.log(NavObjects);
      let ret = [];
      for(let title in NavObjects){
        ret.push(<LinkContainer to={NavObjects[title]}>
        <Nav.Link>{title}</Nav.Link>
        </LinkContainer>)
      } 
      return ret;
    
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
                  {this.renderLinks()}
                </Nav>
                  
                <Navbar.Text>Signed in as: #TODO</Navbar.Text>
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