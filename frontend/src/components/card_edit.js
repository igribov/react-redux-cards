import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardForm from './card_form';
import PropTypes from 'prop-types';
import {
  fetchCard,
  fetchCardFromCache,
  deleteCard,
  deleteCardFromCache,
  saveCardToCache
} from '../actions';

import NotFound from './not_found';
import {bindActionCreators} from 'redux';
import ButtonToolbar from '../containers/button_tool_bar';

class CardEdit extends Component {

  componentDidMount() {
    if (!this.props.card) {
      const id = this.props.match.params.id;
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
      }
    ];

    if (!this.props.disable) {
      buttons.push({
        title: 'Delete',
        to: '#',
        onClick: this.onDeleteButtonClick.bind(this),
        color: 'danger'
      });
    }

    const onAfterSubmit = (card) => {
      if (this.props.disable) return;
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
          disable={this.props.disable}
          initialValues={this.props.card}
          onAfterSubmit={onAfterSubmit}/>
      </div>
    );
  }
}

function mapStateToProps({cards}, ownProps) {
  const id = ownProps.match.params.id;
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

CardEdit.propTypes = {
  card: PropTypes.object,
  match: PropTypes.object,
  fetchCardFromCache: PropTypes.func,
  fetchCard: PropTypes.object,
  deleteCard: PropTypes.object,
  disable: PropTypes.bool,
  saveCardToCache: PropTypes.func,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardEdit);
