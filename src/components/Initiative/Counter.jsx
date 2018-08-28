import React from 'react';
import classNames from 'classnames';
import AnchoredModal from '../reusable/AnchoredModal';
import AbbreviatedNumber from '../reusable/AbbreviatedNumber';

const CounterControls = ({ onUpdate, ...rest }) => {
  return (
    <div className="counter-controls" {...rest}>
      <button className="counter__buttons counter__buttons--top-1" onClick={onUpdate(1)}>+1</button>
      <button className="counter__buttons counter__buttons--top-2" onClick={onUpdate(10)}>+10</button>
      <button className="counter__buttons counter__buttons--top-3" onClick={onUpdate(100)}>+100</button>
      <button className="counter__buttons counter__buttons--bottom-1" onClick={onUpdate(-1)}>-1</button>
      <button className="counter__buttons counter__buttons--bottom-2" onClick={onUpdate(-10)}>-10</button>
      <button className="counter__buttons counter__buttons--bottom-3" onClick={onUpdate(-100)}>-100</button>
    </div>
  );
};

class Counter extends React.Component {
  handleFocus = event => event.target.select();

  handleUpdateCounterValue = amount => () => {
    this.props.onUpdate(this.props.value + amount);
  }

  handleUpdateCounterValueFromForm = event => this.props.onUpdate(Number(event.target.value));

  render () {
    const { value, label, isEditing, onClick, onSubmit } = this.props;
    const classes = classNames({
      'counter': true,
      'counter--editing': isEditing,
    });
    const counterControls = (
      <CounterControls onUpdate={this.handleUpdateCounterValue} />
    );
    const counterForm = (
      <form onSubmit={onSubmit}>
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
    );
    const counterBody = (
      <div className="counter__count">
        <div className="counter__value"><AbbreviatedNumber number={value} /></div>
        <div className="counter__label"><p>{label}</p></div>
      </div>
    );
    const display = (isEditing) ? counterForm : counterBody;
    return (
      <AnchoredModal
        className={classes}
        isOpen={isEditing}
        onClick={onClick}
        modal={counterControls}
      >
        {display}
      </AnchoredModal>
    );
  };
};

export default Counter;
