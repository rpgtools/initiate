// Libs
import React from 'react';
// import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingWithForm: false
    };
    this.myRef = React.createRef();
  };

  componentWillUnmount() {
    if (this.state.isEditing) {
      this.doneEditing();
    }
  }

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
    if (this.myRef && !this.myRef.current.contains(event.target)) {
      this.doneEditing();
    }
  }

  handleDeleteCounter = () => {
    this.doneEditing();
    this.props.onClickDelete();
  }

  render () {
    const { isEditing, isEditingWithForm } = this.state;
    const { value, label, onClickDelete } = this.props;

    //TODO: use the <button /> tag instead of <div />
    return (
      <div
        className={`counter${isEditing ? ' counter__editing' : ''}`}
        ref={this.myRef}
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
        <CSSTransition
          in={isEditing}
          classNames="transition-container-"
          timeout={1500}
          unmountOnExit
        >
          <div className="transition-container">
            <button className="counter__buttons counter__buttons--top-1" onClick={this.onClickIncrement}>+1</button>
            <button className="counter__buttons counter__buttons--top-2" onClick={this.onClickIncrement}>+10</button>
            <button className="counter__buttons counter__buttons--top-3" onClick={this.onClickIncrement}>+100</button>
            <button className="counter__buttons counter__buttons--delete" onClick={onClickDelete}>{'\u2715'}</button>
            <button className="counter__buttons counter__buttons--bottom-1" onClick={this.onClickDecrement}>-1</button>
            <button className="counter__buttons counter__buttons--bottom-2" onClick={this.onClickDecrement}>-10</button>
            <button className="counter__buttons counter__buttons--bottom-3" onClick={this.onClickDecrement}>-100</button>
          </div>
        </CSSTransition>
      </div>
    );
  };
};
