import React from 'react';
import {connect} from 'react-redux';
import {URL} from './../services';
import { bindActionCreators } from 'redux';
// actions
import * as stateManagementActions from './../actions/stateManagement';

const encoding = 'UTF-8';

class StateManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.state
    };
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
    this.fileInput = {click: () => null};
  }

  save = () => {
    const json = JSON.stringify(this.state.data);
    const blob = new Blob([json], {encoding, type: `text/json;charset=${encoding}`});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'initiate.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  load({target}) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, encoding);
    reader.onload = evt => {
      this.props._stateManagement.stateLoad(JSON.parse(evt.target.result));
      target.value = null;
    };
    reader.onerror = evt => alert('Error reading file.');
  }

  render() {
    return (
      <div>
        <input
          ref={input => this.fileInput = input}
          type="file"
          onChange={this.load}
          hidden="hidden"/>
        <button onClick={this.save}>Save</button>
        <button onClick={() => this.fileInput.click()}>Load</button>
      </div>)
  }
}

function mapStateToProps(state) {
  return {state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    _stateManagement: bindActionCreators(stateManagementActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateManagement);
