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
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleFocus(event) {
    event.target.select();
  }
  
  handleSubmit(event) {
    this.props.onSubmit(this.state.value);
    this.toggleForm();
    event.preventDefault();
  }

  toggleForm() {
    this.setState({showForm: !this.state.showForm});
  }

  render() {
    if(this.state.showForm) {
      return(
        <form onSubmit={this.handleSubmit}>
          <input autoFocus type="text" value={this.state.value} onFocus={this.handleFocus} onChange={this.handleChange} />
          <input type="submit" value={this.state.buttonLabel} />
        </form>
      );
    }
    return(
      <button
        className="button button__create"
        onClick={this.toggleForm}
      >{this.state.buttonLabel}</button>
    );
  }
}
