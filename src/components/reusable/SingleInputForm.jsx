import React from 'react';
import Button from './Button';

class SingleInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    const name = event.target.input;
    this.setState({
      name: name
    });
  }

  handleSubmit = (event) => {
    // event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: ""
    })
  }

  render() {
    const { placeholder, ...rest} = this.props;
    return (
      <form onSubmit={this.handleSubmit} {...rest}>
        <input
          name="input"
          type="text"
          placeholder={placeholder}
          value={this.state.name}
          onChange={this.handleInputChange}
          autoFocus
        />
        <Button type="submit" color="blue" label="Save" />
      </form>
    );
  }
}

export default SingleInputForm;
