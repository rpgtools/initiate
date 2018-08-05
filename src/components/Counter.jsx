// Libs
import React from 'react';
// import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import CounterControls from './CounterControls';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingWithForm: false
    };
    this.counterRef = React.createRef();
  };

  componentDidMount() {
    const { top, left } = this.counterRef.current.getBoundingClientRect();
    this.top = top;
    this.left = left;
  }

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
    if (this.counterRef && !this.counterRef.current.contains(event.target)) {
      this.doneEditing();
    }
  }

  handleDeleteCounter = () => {
    this.doneEditing();
    this.props.onClickDelete();
  }

  render () {
    const { isEditing, isEditingWithForm } = this.state;
    const { value, label } = this.props;
    console.log(this.top, this.left);
    return (
      <div
        className={`counter${isEditing ? ' counter__editing' : ''}`}
        ref={this.counterRef}
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
          <CounterControls
            onClickDelete={this.onClickDelete}
            onClickDecrement={this.onClickDecrement}
            onClickIncrement={this.onClickIncrement}
            top={this.top}
            left={this.left}
          />
        </CSSTransition>
      </div>
    );
  };
};
