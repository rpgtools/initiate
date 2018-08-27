import React from 'react';
import ReactDOM from 'react-dom';


const Modal = ({ children, ...rest }) => {
  const portalComponent = (
    <div className="modal-container" {...rest}>
      {children}
    </div>
  );

  return ReactDOM.createPortal(portalComponent, portalRoot);
};

export default Modal;
