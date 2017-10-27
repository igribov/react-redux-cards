import React, {Component} from 'react';
import Card, {CARD_TYPE} from './card';
import {DropTarget} from 'react-dnd';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class BoardColumn extends Component {

	render() {
		const transitionOptions = {
			transitionName: 'fade',
			transitionEnterTimeout: 100,
			transitionLeaveTimeout: 100
		};
		const isBustedMax = this.props.cards.length >= this.props.maxLoad;
		const {title, cards, status, maxLoad, connectDropTarget} = this.props;

		const className = `col-md-3 col-s-3 col-xs-3 board-column column-${status}`;

		return connectDropTarget(
			<div className={className}>
				<h5 className="board-column__title">{title}</h5>
				<ul className={"board-column__list list-group " + (isBustedMax ? ' busted-max' : '')}>
					<CSSTransitionGroup {...transitionOptions}>
						{_.map(cards, (card) => {
							return (
								<Card key={card.id} card={card} />
							);
						})}
					</CSSTransitionGroup>
				</ul>
			</div>
		);
	}

}

const cardDropTarget = {
	canDrop(props, monitor) {
		return props.cards.length < (props.maxLoad || Infinity);
	},

	drop(props, monitor, component) {
		props.onDrop(monitor.getItem());

		return {moved: true};
	},

	hover(props, monitor, component) {

	}
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

