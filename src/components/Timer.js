// Libs
import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// Actions
import * as timerActions from '../actions/timers'

class Timer extends React.Component {
  constructor(props) {
    var moment = require('moment');
    super(props);
    this.state = {
      showForm: false,
      time: moment(),
      start: moment(),
    };
  };
  
  handleIncrementClick = (z = 6) => {
    var moment = require('moment');
    this.setState({time: moment(this.state.time).add(z, 'seconds')});
  }
  
  render() {
    var moment = require('moment');
    return <div>
        {moment(this.state.time).format('Do MMMM, Y | h:mm:ss | ')} Week 
        {moment(this.state.time).format(' w ')}
        Day {this.state.time.diff(this.state.start, 'd') + 1}
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick()}>+1 Round</button>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick(900)}>+15 Min</button>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick(3600)}>+1 Hour</button>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick(3600 * 24)}>+1 Day</button>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick(3600 * 24 * 7)}>+1 Week</button>
      </div>
    
  }
}
const mapStateToProps = (state) => {
  return {
    time: state.time,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _time: bindActionCreators(timerActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);