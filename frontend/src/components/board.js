import React, {Component} from 'react';
import CardsIndex from './cards_index';
import {connect} from 'react-redux';
import {fetchCards, fetchCardsFromCache, saveCardsToCache} from '../actions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

export const COLUMNS_CONFIG = {
  backlog: {
    title: 'Backlog'
  },
  todo: {
    title: 'To Do',
    maxLoad: 4,
  },
  in_progress: {
    title: 'In Progress',
    maxLoad: 2,
  },
  done: {
    title: 'Done',
  },
  closed: {
    title: 'Closed',
  }
};

class Board extends Component {

  componentDidMount() {
    this.props.fetchCardsFromCache()
      .then(this.props.fetchCards)
      .then(res => {
        if (res.error) {
          return;
        }
        this.props.saveCardsToCache(res.payload.data);
      });
  }

  render() {

    return (
      <div className="container-fluid">
        <CardsIndex cards={this.props.cards} configuration={COLUMNS_CONFIG}/>
      </div>
    );
  }
}

Board.propTypes = {
  fetchCardsFromCache: PropTypes.func,
  fetchCards: PropTypes.func,
  saveCardsToCache: PropTypes.func,
  cards: PropTypes.object,
  serverOnline: PropTypes.bool
};

function mapStateToProps({cards}) {
  return {cards};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchCards, fetchCardsFromCache, saveCardsToCache}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
