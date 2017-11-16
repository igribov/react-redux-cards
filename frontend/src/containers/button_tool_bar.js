import React, {Component} from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap/lib/';
import {NavLink} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

export default (props) => (
  <ButtonToolbar>
    {
      props.buttons.map(buttonConf => (
        <LinkContainer key={buttonConf.to} to={buttonConf.to}>
          <Button bsStyle={buttonConf.bsStyle || "default"} bsSize="small">{buttonConf.title}</Button>
        </LinkContainer>
      ))
    }
  </ButtonToolbar>
);