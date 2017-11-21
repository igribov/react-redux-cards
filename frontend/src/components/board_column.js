import React, {Component} from 'react';
import Card, {CARD_TYPE} from './card';
import {DropTarget} from 'react-dnd';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import _ from 'lodash';

class BoardColumn extends Component {

  render() {
    const transitionOptions = {
      transitionName: 'fade',
      transitionEnterTimeout: 0,
      transitionLeaveTimeout: 0
    };
    const {title, cards, status, connectDropTarget} = this.props;
    const isBustedMax = this.props.cards.length >= this.props.maxLoad;
    const className = `col board-column column-${status}`;

    const cardsInBoard = _.map(cards, card => <Card key={card.id} card={card}/>);

    return connectDropTarget(
      <div className={className}>
        <h5 className="board-column__title">{title}</h5>
        <ul className={'board-column__list list-group ' + (isBustedMax ? ' busted-max' : '')}>
          <CSSTransitionGroup {...transitionOptions}>
            {cardsInBoard}
          </CSSTransitionGroup>
        </ul>
      </div>
    );
  }

}

BoardColumn.propTypes = {
  maxLoad: PropTypes.number,
  title: PropTypes.string,
  status: PropTypes.string,
  connectDropTarget: PropTypes.func,
  cards: PropTypes.array,
};

const cardDropTarget = {
  canDrop(/*props, monitor*/) {
    return true;
    //return props.cards.length < (props.maxLoad || Infinity);
  },

  drop(props, monitor/*, component*/) {
    props.onDrop(monitor.getItem());

    return { moved: true };
  },

  // hover(props, monitor, component) {
  //
  // }
};

const connectMonitorTarget = (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({shallow: true}),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
});

export default DropTarget(CARD_TYPE, cardDropTarget, connectMonitorTarget)(BoardColumn);
