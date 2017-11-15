import React, { Component} from 'react';

import { connect } from 'react-redux';
import CardForm from './card_form';
import ButtonsBar from '../containers/buttons_bar';

class CardCreate extends Component {

  render() {

    const navLinks = [
      {
        title: 'Back',
        to: '/'
      }
    ];

    return (
      <div className="container">
        <ButtonsBar links={navLinks}/>
        <div className="col-md-8">
          <h3>Create card</h3>
          <CardForm
            onAfterSubmit={() => this.props.history.push('/')}
          />
        </div>
      </div>
    );
  }
}

export default connect()(CardCreate);