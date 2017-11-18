import React, {Component} from 'react';
import CardsIndex from "./cards_index";
import ButtonToolbar from "../containers/button_tool_bar";
import {connect} from 'react-redux';
import {fetchCards, fetchCardsFromCache} from '../actions';
import {bindActionCreators} from 'redux';

export const COLUMNS_CONFIG = {
  backlog: {
    title: "Backlog"
  },
  todo: {
    title: "To Do",
    maxLoad: 4,
  },
  in_progress: {
    title: "In Progress",
    maxLoad: 2,
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
    this.props.fetchCardsFromCache().then(this.props.fetchCards);
  }

  render() {
    const buttons = [
      {title: 'Create', to: '/card/create'}
    ];

    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <ButtonToolbar buttons={buttons}/>
        </div>
        <CardsIndex cards={this.props.cards} configuration={COLUMNS_CONFIG}/>
      </div>
    );
  }
}

function mapStateToProps({cards}) {
  return {cards};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchCards, fetchCardsFromCache}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
