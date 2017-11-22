import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';

const ButtonToolBar = props => (
  <div className="row">
    {
      props.buttons.map(buttons => (
        <LinkContainer key={buttons.to} to={buttons.to}>
          <Button
            color={buttons.color || 'secondary'}
            onClick={buttons.onClick}>
            {buttons.title}
          </Button>
        </LinkContainer>))
    }
  </div>
);

ButtonToolBar.propTypes = {
  buttons: PropTypes.array
};

export default ButtonToolBar;
