import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';

const AppStatus = (props) => {
  if (props.serverOnline === false) {
    return (
      <div className="d-block p-3 text-center text-white bg-warning b4b">
        <span>Server offline! Readonly mode</span>
      </div>
    );
  }

  if (props.newVersionReady) {
    return (
      <div className="d-block p-3 text-center text-white bg-primary b4b">
        <span>New version is ready</span>
        <Button
          color="default"
          onClick={props.newVersionReady.onConfirm}>
          Change
        </Button>
      </div>
    );
  }

  return <div className="invisible"></div>;
};

AppStatus.propTypes = {
  serverOnline: PropTypes.bool,
  newVersionReady: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};


export default AppStatus;
