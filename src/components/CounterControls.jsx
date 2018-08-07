import React from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById("portal-root");

const CounterControls =({
  onClickDelete,
  handleUpdateCounterValue,
  top,
  left,
}) => {
  const portalComponent = (
    <div className="transition-container" style={{ top, left }}>
      <button className="counter__buttons counter__buttons--top-1" onClick={handleUpdateCounterValue(1)}>+1</button>
      <button className="counter__buttons counter__buttons--top-2" onClick={handleUpdateCounterValue(10)}>+10</button>
      <button className="counter__buttons counter__buttons--top-3" onClick={handleUpdateCounterValue(100)}>+100</button>
      <button className="counter__buttons counter__buttons--delete" onClick={onClickDelete}>{'\u2715'}</button>
      <button className="counter__buttons counter__buttons--bottom-1" onClick={handleUpdateCounterValue(-1)}>-1</button>
      <button className="counter__buttons counter__buttons--bottom-2" onClick={handleUpdateCounterValue(-10)}>-10</button>
      <button className="counter__buttons counter__buttons--bottom-3" onClick={handleUpdateCounterValue(-100)}>-100</button>
    </div>
  );

  return ReactDOM.createPortal(portalComponent, portalRoot);
};

export default CounterControls;
