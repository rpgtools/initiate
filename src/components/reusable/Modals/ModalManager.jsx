import React from 'react';
import { connect } from 'react-redux';
import CustomModal from './CustomModal';

const modalComponentLookupTable = {
  CustomModal,
};

export class ModalManager extends React.Component {
  render() {
    const { currentModals } = this.props;

    const renderedModals = currentModals.map((modalDescription, index) => {
      const { modalType, modalProps = {} } = modalDescription;
      const ModalComponent = modalComponentLookupTable[modalType];

      return <ModalComponent {...modalProps}  key={ modalType + index }/>;
    });

    return <span>{renderedModals}</span>
  }
}

const mapState = state => ({ currentModals : state.modals });

export default connect(mapState, null)(ModalManager);
