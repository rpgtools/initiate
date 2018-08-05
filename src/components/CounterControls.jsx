import React from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById("portal-root");

const CounterControls = React.forwardRef(({
  onClickDelete,
  onClickDecrement,
  onClickIncrement,
  top,
  left,
}, ref) => {
  const portalComponent = (
    <div className="transition-container" style={{ top, left }} ref={ref}>
      <button className="counter__buttons counter__buttons--top-1" onClick={onClickIncrement}>+1</button>
      <button className="counter__buttons counter__buttons--top-2" onClick={onClickIncrement}>+10</button>
      <button className="counter__buttons counter__buttons--top-3" onClick={onClickIncrement}>+100</button>
      <button className="counter__buttons counter__buttons--delete" onClick={onClickDelete}>{'\u2715'}</button>
      <button className="counter__buttons counter__buttons--bottom-1" onClick={onClickDecrement}>-1</button>
      <button className="counter__buttons counter__buttons--bottom-2" onClick={onClickDecrement}>-10</button>
      <button className="counter__buttons counter__buttons--bottom-3" onClick={onClickDecrement}>-100</button>
    </div>
  );

  return ReactDOM.createPortal(portalComponent, portalRoot);
});

export default CounterControls;
