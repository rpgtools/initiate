import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import AnchoredModal from '../reusable/AnchoredModal';
import AbbreviatedNumber from '../reusable/AbbreviatedNumber';

const CounterControls = ({ onUpdate, ...rest }) => {
  return (
    <div className="counter__controls" {...rest}>
      <button className="counter__buttons counter__buttons--top-1" onClick={() => onUpdate(1)}>+1</button>
      <button className="counter__buttons counter__buttons--top-2" onClick={() => onUpdate(10)}>+10</button>
      <button className="counter__buttons counter__buttons--top-3" onClick={() => onUpdate(100)}>+100</button>
      <button className="counter__buttons counter__buttons--bottom-1" onClick={() => onUpdate(-1)}>-1</button>
      <button className="counter__buttons counter__buttons--bottom-2" onClick={() => onUpdate(-10)}>-10</button>
      <button className="counter__buttons counter__buttons--bottom-3" onClick={() => onUpdate(-100)}>-100</button>
    </div>
  );
};

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  componentWillUnmount = () => {
    this.doneEditing();
  }

  startEditing = () => {
    this.setState({isEditing: true});
    document.addEventListener('mouseup', this.handleClickOutsideCounter);
    document.addEventListener('scroll', this.doneEditing, true);
  }

  doneEditing = () => {
    this.setState({
      isEditing: false,
    });
    document.removeEventListener('mouseup', this.handleClickOutsideCounter);
    document.removeEventListener('scroll', this.doneEditing, true);
  }

  handleClick = event => {
    if(!this.state.isEditing && !this.props.showDeleteButton) {
      this.startEditing();
    }
  }

  handleClickOutsideCounter = event => {
    const elem = ReactDOM.findDOMNode(this);
    if (!( elem.contains(event.target) || event.target.className.startsWith('counter__buttons'))) {
      this.doneEditing();
    }
  }

  handleFocus = event => event.target.select();
  handleSubmit = event => this.doneEditing();

  handleUpdateCounterValue = (adjustBy) => {
    this.props.onUpdateCounter(Number(this.props.counter.value) + Number(adjustBy));
  }

  handleUpdateCounterValueFromForm = (event) => {
    const value = Number(event.target.value);
    if(!isNaN(value)) {
      this.props.onUpdateCounter(value);
    }
  }

  render () {
    const { counter } = this.props;
    const { isEditing } = this.state;
    const classes = classNames({
      'counter': true,
      'counter--editing': isEditing,
    });
    const counterControls = (
      <CounterControls onUpdate={this.handleUpdateCounterValue} />
    );
    const counterForm = (
      <form onSubmit={this.handleSubmit}>
        <input
          autoFocus
          type="text"
          value={counter.value}
          onFocus={this.handleFocus}
          onChange={this.handleUpdateCounterValueFromForm}
          required
          />
      </form>
    );
    const counterBody = (
      <div className="counter__count">
        <div className="counter__value"><AbbreviatedNumber number={counter.value} /></div>
        <div className="counter__label"><p>{counter.label}</p></div>
      </div>
    );
    const display = (isEditing) ? counterForm : counterBody;
    return (
      <AnchoredModal
        className={classes}
        isOpen={isEditing}
        onClick={this.handleClick}
        modal={counterControls}
      >
        {display}
    </AnchoredModal>
    );
  };
};

export default Counter;
