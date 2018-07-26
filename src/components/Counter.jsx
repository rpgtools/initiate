// Libs
import React from 'react';
// import PropTypes from 'prop-types';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  };

  handleChange = e => this.props.handleUpdateValue(Number(e.target.value));

  handleFocus = event => event.target.select();

  handleSubmit = e => {
    e.preventDefault();
    this.toggleIsEditing();
  }

  getAmountFromModifiers = event => {
    if(event.metaKey && event.altKey)
      return 1000
    if(event.metaKey)
      return 10
    if(event.altKey)
      return 100
    if(event.shiftKey)
      return 5
    return 1
  };

  onClickDecrement = event =>
    this.props.handleUpdateValue(this.props.value + this.getAmountFromModifiers(event) * -1);

  onClickIncrement = event =>
    this.props.handleUpdateValue(this.props.value + this.getAmountFromModifiers(event));

  toggleIsEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  };

  render () {
    if (this.state.isEditing) {
      return (
        <div className="counter counter__editing">
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              type="number"
              value={this.props.value}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              required
              />
            <input type="submit" value="Save" />
          </form>
        </div>
      );
    };
    return(
      <div className="counter">
        <button className="button button__delete" onClick={this.props.onClickDelete}>x</button>
        <button className="button button__increment" onClick={this.onClickIncrement}>+</button>
        <a className="counter_count" onClick={this.toggleIsEditing}>{this.props.value}</a>
        <span className="counter_label">{this.props.label}</span>
        <button className="button button__decrement" onClick={this.onClickDecrement}>-</button>
      </div>
    );
  };
};
