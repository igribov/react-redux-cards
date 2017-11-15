import React, {Component} from 'react';
import CardsIndex from "./cards_index";
import ButtonsBar from "../containers/buttons_bar";
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
		title: "Close",
	}
};

class Board extends Component {

  componentDidMount() {
      this.props.fetchCards();
  }

  render() {
    const navLinks = [
      { title: 'New Card', to: '/card/create' },
    ];

    return (
      <div className="container">
        <ButtonsBar links={navLinks} />
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