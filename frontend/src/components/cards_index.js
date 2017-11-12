import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardColumn from './board_column';
import {updateCard} from '../actions';
import {bindActionCreators} from 'redux';
import { toast } from 'react-toastify';

class CardsIndex extends Component {

	constructor(props) {
		super(props);
		this.renderBoardColumn = this.renderBoardColumn.bind(this);
		this.onCardDrop = this.onCardDrop.bind(this);
	}

	onCardDrop(card, newStatus) {
		card.status = newStatus;
		this.props.updateCard(card);
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

		return (
			<div>
				{
					_.map(groupedData, (data, statusCode) => {
						return this.renderBoardColumn(data, {status: statusCode, ...boardConfiguration[statusCode]})
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

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(CardsIndex));
