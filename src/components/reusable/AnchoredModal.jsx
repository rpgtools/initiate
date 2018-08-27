import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from './Modal';

const portalRoot = document.getElementById("portal-root");

class AnchoredModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0
    };
  }

  componentDidUpdate = (props) => {
    const { top, left } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    this.setState({ top: top, left });
  }

  render() {
    const { top, left } = this.state;
    const { children, isOpen, modal, ...rest } = this.props;
    return (
      <div {...rest}>
        {children}
        <CSSTransition
          in={isOpen}
          classNames="modal-container-"
          timeout={120}
          unmountOnExit
        >
          <Modal style={{top, left}}>
            {modal}
          </Modal>
        </CSSTransition>
      </div>
    );
  }
}

export default AnchoredModal;
