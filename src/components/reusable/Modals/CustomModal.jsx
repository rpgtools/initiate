import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import * as modalActions from '../../../store/modals/actions';

const escKey = 27;

class CustomModal extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscKey, false);
    document.addEventListener("click", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscKey, false);
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  handleClickOutside = (event) => {
    const elem = ReactDOM.findDOMNode(this);
    if(!event.target.className.startsWith("modal__content")) this.props.closeModal();
  }

  handleEscKey = (event) => {
    const keyCode = event.keyCode || event.which
    if(escKey === keyCode) this.props.closeModal();
  }

  render() {
    const { content } = this.props;
    return (
      <div className="modal custom-modal">
        <div className="modal__content">
          {content}
          <button className="modal__close" onClick={this.props.closeModal}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  closeModal: modalActions.closeModal
}

export default connect(null, mapDispatch)(CustomModal);
