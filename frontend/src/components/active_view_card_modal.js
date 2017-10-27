import React, {Component} from 'react';
import reduxDialog from 'redux-dialog';
import {connect} from 'react-redux';
import { closeDialog } from 'redux-dialog';

const ActiveViewCardModal = (props) => {
	const {card} = props;

	return (
		<div>
			<h4>{card.title}</h4>
			<date>{card.date}</date>
			<p>{card.description}</p>
		</div>
	);
};

function mapStateToProps({activeViewCard}) {
	return {card: activeViewCard};
}

export default reduxDialog({
	name: 'cardViewModal',
	contentLabel: '--'
})(connect(mapStateToProps)(ActiveViewCardModal));