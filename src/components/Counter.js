// Libs
import React from 'react';
// import PropTypes from 'prop-types';
export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      value: this.props.value.toString()
    };
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      value: nextProps.value.toString()
    });
  };

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

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  onClickDelete = event => {
    this.props.onCounterDelete(this.props.id);
  };

  handleFocus = event => {
    event.target.select();
  };

  onClickDecrement = event => {
    this.updateValue(this.getAmountFromModifiers(event) * -1);
  };

  onClickIncrement = event => {
    this.updateValue(this.getAmountFromModifiers(event));
  };

  updateValue = amount => {
    var new_value = this.props.value + amount;
    this.props.onUpdateValue({
      id: this.props.id,
      value: new_value
    });
    this.setState({value: new_value.toString()});
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    if(this.state.showForm) {
      return(
        <div className="counter_widget counter_widget_edit">
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus} />
            <input type="submit" value="Save" />
          </form>
        </div>
      );
    };
    return(
      <div className="counter_widget">
        <button className="button button__delete" onClick={this.onClickDelete}>x</button>
        <button className="button button__increment" onClick={this.onClickIncrement}>+</button>
        <a className="counter_count" onClick={this.toggleForm}>{this.state.value}</a>
        <span className="counter_label">{this.props.label}</span>
        <button className="button button__decrement" onClick={this.onClickDecrement}>-</button>
      </div>
    );
  };
};
