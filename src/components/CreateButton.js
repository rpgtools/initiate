import React from 'react';

export class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      buttonLabel: props.buttonLabel,
      value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value);
    this.handleToggle();
    event.preventDefault();
  }

  handleToggle() {
    this.setState({showForm: !this.state.showForm});
  }

  render() {
    if(this.state.showForm) {
      return(
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value={this.state.buttonLabel} />
        </form>
      );
    }
    return(
      <button
        className="counter-create"
        onClick={this.handleToggle}
      >{this.state.buttonLabel}</button>
    );
  }
}
