import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import AnchoredModal from '../reusable/AnchoredModal';
import SingleInputForm from '../reusable/SingleInputForm';

class CreateCounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  startEditing = () => {
    this.setState({isEditing: true});
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  doneEditing = () => {
    this.setState({
      isEditing: false,
    });
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  handleClick = event => {
    const elem = ReactDOM.findDOMNode(this);
    if(!this.state.isEditing) {
      this.startEditing();
    }
  }

  handleClickOutside = event => {
    const elem = ReactDOM.findDOMNode(this);
    if (!(elem.contains(event.target))) {
      this.doneEditing();
    }
  }

  handleCreateCounterSubmit = name => {
    this.props.onSubmit({label: name, value: 0});
    this.doneEditing();
  }

  render () {
    const { isEditing } = this.state;
    const classes = classNames({
      'create-counter-button': true,
      'create-counter-button--editing': isEditing,
    });
    const form = (
      <div className="create-counter-form">
        <SingleInputForm placeholder="Enter a label..." onSave={this.handleCreateCounterSubmit}/>
      </div>
    );
    return (
      <div>
        <div
          className={classes}
          onClick={this.handleClick}
        >
          {(isEditing) ? form : '+'}
        </div>
      </div>
    );
  };
};

export default CreateCounterButton;
