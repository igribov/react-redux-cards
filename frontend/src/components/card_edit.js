import React, { Component} from 'react';
import { connect } from 'react-redux';
import CardForm from './card_form';
import {fetchCard, deleteCard} from '../actions';

class CardEdit extends Component {

  componentDidMount() {
    if(!this.props.card) {
      const id = this.props.match.params.id;
      this.props.fetchCard(id);
    }
  }

  onDeleteButtonClick() {
    this.props.deleteCard(this.props.card, () => this.props.history.push('/'));
  }

  render() {
    return (
      <div className="container">
        <h3>Edit card</h3>
        <button
          className="btn btn-danger"
          onClick={this.onDeleteButtonClick.bind(this)}
        >
          Delete
        </button>

        <div className="col-md-8">
          <CardForm
            initialValues={this.props.card}
            onAfterSubmit={() => this.props.history.push('/')}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({cards}, {match: {params: {id}}}) {
  return {
    card: cards[id]
  };
}

export default connect(mapStateToProps,{fetchCard, deleteCard})(CardEdit);