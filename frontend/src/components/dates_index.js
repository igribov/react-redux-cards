import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchCards, setActiveDate} from '../actions';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';

class DatesIndex extends Component {

  constructor(props) {
    super(props);
    this.onDateClick = this.onDateClick.bind(this);
    this.renderDate = this.renderDate.bind(this);
  }

  renderDate(date) {
    const {activeDate} = this.props;
    const isThisDateActive = (activeDate && date.date === activeDate.date);
    return (
      <li
        className={'list-group-item pointer ' + (isThisDateActive ? 'active' : '')}
        onClick={(e) => this.onDateClick(date)}
        key={date.date}>
        <span>
          {date.date}
          </span>
      </li>
    );
  }

  onDateClick(date) {
    this.props.setActiveDate(date);
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          { _.map(this.props.dates, this.renderDate) }
        </ul>
      </div>
    );
  }
}

function mapStateToProps({cards, activeDate}) {
  if(!activeDate) {
    activeDate = { date: _.map(cards, ({date}) => (date)).pop() }
  }

  const dates = _.map(_.keys(_.mapKeys(cards, 'date')), (date) => {
    return {date};
  });

  return {dates, activeDate};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setActiveDate}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DatesIndex);
