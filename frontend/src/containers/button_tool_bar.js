import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

export default (props) => (
  <div className="row">
    {
      props.buttons.map(buttonConf => (
        <LinkContainer key={buttonConf.to} to={buttonConf.to}>
          <Button 
            color={buttonConf.color || "secondary"}
            onClick={buttonConf.onClick}>
            {buttonConf.title}
          </Button>
        </LinkContainer>))
    }
  </div>
);