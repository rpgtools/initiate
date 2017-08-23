import React from 'react';

export default class WebFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      value: '',
      showForm: true,
    };
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleFocus = event => {
    event.target.select();
  };

  handleSubmit = event => {
    this.setState({url: this.state.value});
    this.toggleForm();
    event.preventDefault();
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    if(this.state.showForm) {
      return(
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="URL"
            autoFocus
            type="url"
            value={this.state.value}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
          <input type="submit" value="Render" />
        </form>
      );
    };
    return(
      <div>
        <button
          className="button button__settings"
          onClick={this.toggleForm}
        >Edit</button>
        <hr/>
        <iframe style={{width:"100%"}} title={this.state.url} src={this.state.url}></iframe>
      </div>
    );
  };
};
