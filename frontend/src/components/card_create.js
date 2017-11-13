import React, { Component} from 'react';

import { connect } from 'react-redux';
import CardForm from './card_form';
import {FORM_TYPE_CREATE} from './card_form';

class CardCreate extends Component {

  render() {
    return (
      <div className="container">
        <h3>Создание задачи</h3>
        <div className="col-md-8">
          <CardForm
            formType={FORM_TYPE_CREATE}
            onAfterSubmit={() => this.props.history.push('/')}
          />
        </div>
      </div>
    );
  }
}

export default connect()(CardCreate);