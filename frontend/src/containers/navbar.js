import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse} from 'reactstrap';
import {NavLink} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light className="navbar-toggleable-md">
          <LinkContainer to="/">
            <NavbarBrand className="mr-auto">Cards App</NavbarBrand>
          </LinkContainer>
          <NavbarToggler onClick={this.toggleNavbar} className="navbar-toggler-right"/>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="right" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/profile/">Profile</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}