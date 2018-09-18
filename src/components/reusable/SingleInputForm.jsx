import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

class SingleInputForm extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    showButton: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'Enter a name...',
    buttonText: 'Ok',
    showButton: true,
    defaultValue: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    })
  }

  render() {
    const {
      placeholder,
      buttonText,
      showButton,
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleInputChange}
          autoFocus
        />
      {showButton && <Button type="submit" color="blue" label={buttonText} />}
      </form>
    );
  }
}

export default SingleInputForm;
