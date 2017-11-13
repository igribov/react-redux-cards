import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardForm from './card_form';
import {fetchCard, deleteCard} from '../actions';
import NotFound from './not_found';
import {FORM_TYPE_UPDATE} from './card_form';

class CardEdit extends Component {

  componentDidMount() {
    if (!this.props.card) {
      const id = this.props.match.params.id;
      this.props.fetchCard(id);
    }
  }

  onDeleteButtonClick() {
    this.props.deleteCard(this.props.card)
      .then(() => this.props.history.push('/'));
  }

  render() {
    if (this.props.error) return <NotFound />;

    if (!this.props.card && !this.props.error) return <div className="container">Загрузка ...</div>;

    return (
        <div className="container">
          <h3>Редактирование</h3>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteButtonClick.bind(this)}>Удалить</button>

          <div className="col-md-8">
            <CardForm
              formType={FORM_TYPE_UPDATE}
              initialValues={this.props.card}
              onAfterSubmit={() => this.props.history.push('/')}/>
          </div>
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

export default connect(mapStateToProps, {fetchCard, deleteCard})(CardEdit);
