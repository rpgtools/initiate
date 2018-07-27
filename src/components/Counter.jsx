// Libs
import React from 'react';
// import PropTypes from 'prop-types';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingWithForm: false
    };
  };

  handleChange = e => this.props.handleUpdateValue(Number(e.target.value));

  handleFocus = event => event.target.select();

  handleSubmit = e => {
    e.preventDefault();
    this.doneEditing();
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

  handleClickToEdit = () => {
    this.state.isEditing
      ? this.setState({ isEditingWithForm: true })
      : this.setState({ isEditing: true })
    document.addEventListener('mouseup', this.handleClickOutsideCounter)
  }

  doneEditing = () => {
    this.setState({
      isEditing: false,
      isEditingWithForm: false
    });
    document.removeEventListener('mouseup', this.handleClickOutsideCounter);
  }

  handleClickOutsideCounter = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.doneEditing();
    }
  }

  setWrapperRef = node => this.wrapperRef = node;

  render () {
    const { isEditing, isEditingWithForm } = this.state;
    const { value, label, onClickDelete } = this.props;

    return (
      <div
        className={`counter${isEditing ? ' counter__editing' : ''}`}
        ref={this.setWrapperRef}
      >
        {!isEditingWithForm ? (
          <div className="counter__value">
            <a className="counter__value--count" onClick={this.handleClickToEdit}>{value}</a>
            <span className="counter__value--label">{label}</span>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              type="number"
              value={value}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              required
              />
            <input type="submit" value="Save" />
          </form>
        )}
        {isEditing &&
          <div className="counter__buttons">
            <button className="button button__delete" onClick={onClickDelete}>x</button>
            <button className="button button__increment" onClick={this.onClickIncrement}>+</button>
            <button className="button button__decrement" onClick={this.onClickDecrement}>-</button>
          </div>
        }
      </div>
    );
  };
};
