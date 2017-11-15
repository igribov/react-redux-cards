import React, { Component} from 'react';

import { connect } from 'react-redux';
import CardForm from './card_form';

class CardCreate extends Component {

  render() {
    return (
      <div className="container">
        <h3>Create card</h3>
        <div className="col-md-8">
          <CardForm
            onAfterSubmit={() => this.props.history.push('/')}
          />
        </div>
      </div>
    );
  }
}

export default connect()(CardCreate);