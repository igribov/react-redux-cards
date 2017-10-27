import React, {Component} from 'react';
import CardsIndex from "./cards_index";
import Navbar from "./navbar";
import {connect} from 'react-redux';
import {fetchCards} from '../actions';
import {bindActionCreators} from 'redux';

const COLUMNS_CONFIG = {
	backlog: {
		title: "Бэклог"
	},
	todo: {
		title: "Сделать",
		maxLoad: 6,
	},
	in_progress: {
		title: "В прогрессе",
		maxLoad: 4,
	},
	done: {
		title: "Сделано",
	}
};

class Board extends Component {

  componentDidMount() {
      this.props.fetchCards();
  }

  render() {
    const navLinks = [
      { title: 'Create', to: '/card/create' }
    ];

    return (
      <div className="container">
        <Navbar links={navLinks} />
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