import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {default as TouchBackend} from 'react-dnd-touch-backend';
import BoardColumn from './board_column';
import {updateCard} from '../actions';
import {bindActionCreators} from 'redux';
import {IS_MOBILE} from '../services/mobile_detector';

class CardsIndex extends Component {

  constructor(props) {
    super(props);
    this.renderBoardColumn = this.renderBoardColumn.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
  }

  onCardDrop(card, newStatus) {
    if (newStatus === card.status) {
      return;
    }
    const cardData = _.clone(card);
    cardData.status = newStatus;
    this.props.updateCard(cardData).then(res => {
      if (!res.error && res.payload) {
        card = _.merge(card, res.payload.data);
      }
    });
  }

  renderBoardColumn(cards = [], config) {
    return (
      <BoardColumn
        key={config.status}
        {...config}
        cards={cards}
        onDrop={(card) => this.onCardDrop(card, config.status)}
      />
    );
  }

  render() {
    const {cards} = this.props;
    const groupedData = {};
    const boardConfiguration = this.props.configuration;

    _.each(boardConfiguration, (conf, statusCode) => {
      groupedData[statusCode] = _.filter(cards, card => (card.status === statusCode))
    });
    const colWidth = Math.floor(12 / Object.keys(boardConfiguration).length) < 1 ? 1 : Math.floor(12 / Object.keys(boardConfiguration).length);

    return (
      <div>
        {
          _.map(groupedData, (data, statusCode) => {
            return this.renderBoardColumn(data, {colWidth, status: statusCode, ...boardConfiguration[statusCode]})
          })
        }
      </div>
    );
  }
}

function mapStateToProps({cards}) {
  return {cards};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateCard}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(IS_MOBILE ? TouchBackend : HTML5Backend)(CardsIndex));
