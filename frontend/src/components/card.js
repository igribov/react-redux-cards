import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {Link} from 'react-router-dom';
import {openDialog, closeDialog} from 'redux-dialog';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setActiveViewCard} from "../actions";

class Card extends Component {

	onViewButtonClick() {
		this.props.setActiveViewCard(this.props.card);
		this.props.openDialog('cardViewModal');
	}

	render() {
		const {card} = this.props;
		const {isDragging, connectDragSource} = this.props;

		if (isDragging) {
			return null;
		}
		return connectDragSource(
			<li
				className="list-group-item drag-and-drop"
				key={card.id}>
				<div className="task-card">
					<span className="card__title">{card.title}</span>
					<span
						className={"label label-primary card__status card__status-" + card.status}
					>
            {card.status}
          </span>
					&nbsp;
					<Link className="btn btn-default edit-link" to={`/card/edit/${card.id}`}>&#x270E;</Link>
					<a href="#" onClick={this.onViewButtonClick.bind(this)}>View</a>
				</div>
			</li>
		);
	}

}

const cardSource = {
	canDrag(props) {
		// You can disallow drag based on props
		return true;
		//return props.card.status !== CARD_STATUS_DONE;
	},

	isDragging(props, monitor) {
		// If your component gets unmounted while dragged
		// (like a card in Kanban board dragged between lists)
		// you can implement something like this to keep its
		// appearance dragged:
		return monitor.getItem().id === props.card.id;
	},

	beginDrag(props, monitor, component) {
		// Return the data describing the dragged item
		return props.card;
	}

};

const connectMonitorSource = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

export const CARD_TYPE = 'card';

function mapDispatchToProps(dispatch) {
	return bindActionCreators({openDialog, closeDialog, setActiveViewCard}, dispatch);
}

const ConnectedCard = connect(null, mapDispatchToProps)(Card);

export default DragSource(CARD_TYPE, cardSource, connectMonitorSource)(ConnectedCard);