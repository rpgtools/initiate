import React from 'react';
import Button from '../reusable/Button';

class CreatureCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: ""
    })
  }

  render() {
    return (
      <form className="creature-create-form" onSubmit={this.handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Creature Name"
          value={this.state.name}
          onChange={this.handleInputChange}
          autoFocus
        />
        <Button type="submit" color="blue" label="Save" />
      </form>
    );
  }
}

export default CreatureCreateForm;
