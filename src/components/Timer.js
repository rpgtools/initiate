// Libs
import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// Actions
import * as timerActions from '../actions/timers'

const start = '1991-07-27 08:32'

class Timer extends React.Component {
  constructor(props) {
    var moment = require('moment');
    super(props);
    this.state = {
      showForm: false,
    };
  };
  
  handleIncrementClick = (z = 6) => {
    var moment = require('moment');
    this.props._time.updateTime(moment(this.props.time).add(z, 'seconds'));
  }
  
  render() {
    var moment = require('moment');
    var day = moment(this.props.time).diff(start, 'd');
    return <div>
        {moment(this.props.time).format(' h:mm:ss | ')} Week {Math.floor(day / 7 + 1)} | {moment(this.props.time).format('dddd')} | Day {day+1}
        <br/>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick()}>+1 Round</button>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick(900)}>+15 Min</button>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick(3600)}>+1 Hour</button>
        <button className="button button__increment" onClick={(event) => this.handleIncrementClick(3600 * 24 + 1)}>+1 Day</button>
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