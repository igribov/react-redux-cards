import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';

const ButtonToolBar = props => (
  <div className="row">
    {
      props.buttons.map(buttonConf => (
        <LinkContainer key={buttonConf.to} to={buttonConf.to}>
          <Button
            color={buttonConf.color || 'secondary'}
            onClick={buttonConf.onClick}>
            {buttonConf.title}
          </Button>
        </LinkContainer>))
    }
  </div>
);

ButtonToolBar.propTypes = {
  buttons: PropTypes.array
};

export default ButtonToolBar;
