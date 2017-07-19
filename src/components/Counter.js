import React from 'react';

export class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.count,
    }
  }

  handleIncrementClick(event) {
    this.setState({count: this.state.count + this.getAmount(event)});
  }

  handleDecrementClick(event) {
    this.setState({count: this.state.count - this.getAmount(event)});
  }

  getAmount(event) {
    if(event.metaKey && event.altKey)
      return 1000
    if(event.metaKey)
      return 100
    if(event.altKey)
      return 10
    return 1
  }

	render() {
		return(
      <div className="counter_widget">
        <button className="counter_widget-decrement_button" onClick={(event) => this.handleIncrementClick(event)}>+</button>
        {this.state.count} <span className="counter_widget-label">{this.props.label}</span>
        <button className="counter_widget-decrement_button" onClick={(event) => this.handleDecrementClick(event)}>-</button>
      </div>
    );
	}
}
