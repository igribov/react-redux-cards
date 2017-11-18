import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardForm from './card_form';
import {
  fetchCard,
  fetchCardFromCache,
  deleteCard,
  deleteCardFromCache,
  saveCardToCache
} from '../actions';

import NotFound from './not_found';
import {bindActionCreators} from 'redux';
import ButtonToolbar from "../containers/button_tool_bar";

class CardEdit extends Component {

  componentDidMount() {
    if (!this.props.card) {
      const {id} = this.props.match.params;
      this.props.fetchCardFromCache(id).then(() => this.props.fetchCard(id));
    }
  }

  onDeleteButtonClick() {
    const {props} = this;
    this.props.deleteCard(props.card)
      .then(() => props.deleteCardFromCache(props.card))
      .then(() => props.history.push('/'));
  }

  render() {
    if (!this.props.card) return <NotFound />;

    const buttons = [
      {
        title: 'Back',
        to: '/',
        color: 'primary'
      },
      {
        title: 'Delete',
        to: '#',
        onClick: this.onDeleteButtonClick.bind(this),
        color: 'danger'
      }
    ];

    const onAfterSubmit = (card) => {
      this.props.saveCardToCache(card)
        .then(() => this.props.history.push('/'));
    };

    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <ButtonToolbar buttons={buttons}/>
        </div>
        <CardForm
          updateForm={true}
          initialValues={this.props.card}
          onAfterSubmit={onAfterSubmit}/>
      </div>
    );
  }
}

function mapStateToProps({cards}, {match: {params: {id}}}) {
  return {
    card: cards[id],
    error: cards.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCard,
    fetchCardFromCache,
    deleteCard,
    deleteCardFromCache,
    saveCardToCache
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardEdit);
