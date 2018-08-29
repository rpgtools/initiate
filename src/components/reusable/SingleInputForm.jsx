import React from 'react';
import Button from './Button';

class SingleInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleInputChange = (event) => {
    const name = event.target.value;
    this.setState({
      name: name
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSave(this.state.name);
    this.setState({
      name: ""
    })
  }

  render() {
    const { placeholder } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder={placeholder}
          value={this.state.name}
          onChange={this.handleInputChange}
          autoFocus
        />
        <Button type="submit" color="blue" label="Ok" />
      </form>
    );
  }
}

export default SingleInputForm;
