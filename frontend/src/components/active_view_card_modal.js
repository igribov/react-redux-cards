import React, {Component} from 'react';
import reduxDialog from 'redux-dialog';
import {connect} from 'react-redux';
import { closeDialog } from 'redux-dialog';

const ActiveViewCardModal = (props) => {
	const {card} = props;

	return (
		<div className="col-md-6 col-sx-12 col-s-12">
			<h4>{card.title}</h4>
			<table className="table">
				<tbody>
          <tr key="status"><td>Status</td><td>{card.status}</td></tr>
          <tr key="description"><td>Description</td><td>{card.description}</td></tr>
				</tbody>
			</table>
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