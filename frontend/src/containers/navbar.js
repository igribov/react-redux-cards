import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap/lib/';
import {NavLink} from 'react-router-dom'

export default (props) => (
  <Navbar className="app-navigation" inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">Cards App</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavDropdown title="User" id="basic-nav-dropdown">
          <MenuItem >SignOut</MenuItem>
          <MenuItem divider/>
          <MenuItem >Profile</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);