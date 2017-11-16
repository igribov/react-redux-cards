import React, {Component} from 'react';
import CardsIndex from "./cards_index";
import ButtonToolbar from "../containers/button_tool_bar";
import {connect} from 'react-redux';
import {fetchCards} from '../actions';
import {bindActionCreators} from 'redux';

export const COLUMNS_CONFIG = {
	backlog: {
		title: "Backlog"
	},
	todo: {
		title: "ToDo",
		maxLoad: 6,
	},
	in_progress: {
		title: "In Progress",
		maxLoad: 4,
	},
	done: {
		title: "Done",
	},
	closed: {
		title: "Closed",
	}
};

class Board extends Component {

  componentDidMount() {
      this.props.fetchCards();
  }

  render() {
    const buttons = [
      { title: 'Create', to: '/card/create' }
    ];

    return (
      <div>
        <ButtonToolbar buttons={buttons} />
        <div className="board">
            <CardsIndex cards={this.props.cards} configuration={COLUMNS_CONFIG}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({cards}) {
    return {cards};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchCards}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);