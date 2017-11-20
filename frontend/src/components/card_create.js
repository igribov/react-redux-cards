import React from 'react';
import ButtonToolbar from "../containers/button_tool_bar";
import { connect } from 'react-redux';
import CardForm from './card_form';
import {saveCardToCache} from '../actions';
import {bindActionCreators} from 'redux';

const buttons = [
    {
      title: 'Back',
      to: '/',
      color: 'primary'
    }
];

const CardCreate = (props) => {
  const onAfterSubmit = (card) => {
    props.saveCardToCache(card)
      .then(() => props.history.push('/'));
  };

  return(
    <div className="container-fluid">
      <div className="container-fluid">
        <ButtonToolbar buttons={buttons}/>
      </div>
      <CardForm onAfterSubmit={onAfterSubmit} />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({saveCardToCache}, dispatch);
}

export default connect(null, mapDispatchToProps)(CardCreate);
