import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { actions as modalActions } from '../../../store/modals';

class CustomModal extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <div className="modal custom-modal">
        {content}
        <span className="modal--close">
          <FontAwesomeIcon icon={faTimesCircle} onClick={this.props.closeModal}/>
        </span>
      </div>
    );
  }
}

const mapDispatch = {
  closeModal: modalActions.clodeModal
}

export default connect(null, mapDispatch)(CustomModal);
