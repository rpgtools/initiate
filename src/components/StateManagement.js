import React from 'react';
import {connect} from 'react-redux';
import {stateLoad} from './../actions';

const encoding = 'UTF-8';

class StateManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.state,
      download: null
    };
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    const {download} = this.state;
    return <div>
      {download
        ? <a href={download} onClick={this.reset} download="initiate.json">Download</a>
        : <button onClick={this.save}>Save</button>}
      <input type="file" onChange={this.load}/>
    </div>
  }

  save() {
    const json = JSON.stringify(this.state.data);
    const blob = new Blob([json], {encoding, type: `text/json;charset=${encoding}`});
    const url = window.URL.createObjectURL(blob);
    this.setState({download: url})
  }

  load({target}) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, encoding);
    reader.onload = evt => {
      this.props.handleLoadState(JSON.parse(evt.target.result));
      target.value = null;
    };
    reader.onerror = evt => alert('Error reading file.');
  }

  reset() {
    window.URL.revokeObjectURL(this.state.download);
    this.setState({download: null});
  }
}

function mapStateToProps(state) {
  return {state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoadState: state => dispatch(stateLoad(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateManagement);
