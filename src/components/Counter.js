import React from 'react';

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      value: nextProps.count.toString()
    })
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
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = event => {
    this.props.handleSetCount({
      id: this.props.id,
      count: parseInt(this.state.value,10)
    })
    this.toggleForm()
    event.preventDefault()
  }

  handleFocus = event => {
    event.target.select();
  }

  onClickDecrement = event => {
    this.updateValue(this.getAmountFromModifiers(event) * -1);
  }

  onClickIncrement = event => {
    this.updateValue(this.getAmountFromModifiers(event));
  }

  updateValue = amount => {
    this.props.handleSetCount({
      id: this.props.id,
      count: this.props.count + amount
    });
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    if(this.state.showForm) {
      return(
        <div className="counter_widget counter_widget_edit">
          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" value={this.state.value} onChange={this.handleChange} onFocus={this.handleFocus} />
            <input type="submit" value="Save" />
          </form>
        </div>
      );
    }
    return(
      <div className="counter_widget">
        <button className="button button__increment" onClick={this.onClickIncrement}>+</button>
        <a className="counter_count" onClick={this.toggleForm}>{this.props.count}</a>
        <span className="counter_label">{this.props.label}</span>
        <button className="button button__decrement" onClick={this.onClickDecrement}>-</button>
      </div>
    );
  }
}
