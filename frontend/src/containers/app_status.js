import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';

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
          color="primary"
          onClick={props.newVersionReady.onConfirm}
          >
          Change
        </Button>
      </div>
    );
  }

  return (
    <div
      className="invisible">
    </div>
  );
}


export default AppStatus;
