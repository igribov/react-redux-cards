import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardForm from './card_form';
import {fetchCard, deleteCard} from '../actions';
import NotFound from './not_found';
import ButtonsBar from '../containers/buttons_bar';

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

    if (!this.props.card && !this.props.error) return <div className="container">Loading ...</div>;

    const navLinks = [
      {
        title: 'Back',
        to: '/'
      },
      {
        title: 'Delete',
        to: '#',
        onClick: this.onDeleteButtonClick.bind(this),
        className: 'btn btn-danger'
      }
    ];

    return (
      <div className="container">
        <ButtonsBar links={navLinks}/>
        <div className="col-md-8">
          <h3>Edit card</h3>
          <CardForm
            update={true}
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
