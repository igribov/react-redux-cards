import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardForm from './card_form';
import {fetchCard, deleteCard} from '../actions';
import NotFound from './not_found';
import ButtonToolbar from "../containers/button_tool_bar";

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

    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <ButtonToolbar buttons={buttons}/>
        </div>
        <CardForm
          updateForm={true}
          initialValues={this.props.card}
          onAfterSubmit={() => this.props.history.push('/')}/>
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
