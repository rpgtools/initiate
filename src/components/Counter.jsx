// Libs
import React from 'react';
// import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import CounterControls from './CounterControls';
import { abbrNum } from '../utils';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingWithForm: false,
      top: 0,
      left: 0
    };
    this.counterRef = React.createRef();
  };

  componentDidMount() {
    this.updateCounterPosition();
  }

  componentWillUnmount() {
    if (this.state.isEditing) {
      this.doneEditing();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initiativeWindowScrollTop &&
        prevProps.initiativeWindowScrollTop !== this.props.initiativeWindowScrollTop) {
      this.updateCounterPosition();
      this.doneEditing();
    }
  }

  updateCounterPosition = () => {
    const { top, left } = this.counterRef.current.getBoundingClientRect();
    this.setState({ top: top, left });
  }


  handleFocus = event => event.target.select();

  handleSubmit = e => {
    e.preventDefault();
    this.doneEditing();
  }

  handleUpdateCounterValue = amount => () => {
    this.props.handleUpdateValue(this.props.value + amount);
  }

  handleUpdateCounterValueFromForm = event => this.props.handleUpdateValue(Number(event.target.value));

  handleDeleteCounter = () => {
    this.doneEditing();
    this.props.onClickDelete();
  }

  handleClickToEdit = event => {
    this.state.isEditing && this.counterRef.current.contains(event.target)
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
    if (
      this.counterRef &&
      !this.counterRef.current.contains(event.target) &&
      !event.target.className.startsWith('counter__buttons')
    ) {
      this.doneEditing();
    }
  }

  render () {
    const { isEditing, isEditingWithForm , top, left } = this.state;
    const { value, label } = this.props;
    const abbrVal = abbrNum(value, 1);
    return (
      <div
        className={`counter${isEditing ? ' counter__editing' : ''}`}
        ref={this.counterRef}
        onClick={this.handleClickToEdit}
      >
        {!isEditingWithForm ? (
          <div className="counter__value">
            <div className="counter__value--count">
              <p style={{ fontSize: abbrVal.length > 5
                   ? '14px'
                   : '20px'}}>
                {abbrVal}
              </p>
            </div>
            <div className="counter__value--label">
              <p>{label}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              type="number"
              value={value}
              onFocus={this.handleFocus}
              onChange={this.handleUpdateCounterValueFromForm}
              required
              />
            <input type="submit" value="Save" />
          </form>
        )}
        <CSSTransition
          in={isEditing}
          classNames="transition-container-"
          timeout={120}
          unmountOnExit
        >
          <CounterControls
            onClickDelete={this.handleDeleteCounter}
            handleUpdateCounterValue={this.handleUpdateCounterValue}
            top={top}
            left={left}
          />
        </CSSTransition>
      </div>
    );
  };
};
