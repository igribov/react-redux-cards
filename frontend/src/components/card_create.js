import React from 'react';
import ButtonToolbar from "../containers/button_tool_bar";
import { connect } from 'react-redux';
import CardForm from './card_form';

const buttons = [
    {
      title: 'Back',
      to: '/',
      color: 'primary'
    }
];

const CardCreate = (props) => (
  <div className="container-fluid">
    <div className="container-fluid">
      <ButtonToolbar buttons={buttons}/>
    </div>
    <CardForm onAfterSubmit={() => props.history.push('/')} />
  </div>
);

export default connect()(CardCreate);