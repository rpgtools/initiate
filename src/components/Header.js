import {connect} from 'react-redux';
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';

//Components
import StateManagement from './StateManagement';
import * as layoutsActions from '../actions/layouts'
class Header extends Component {
  render() {
    return(
      <div className='header'>
        <button style={{float:"right"}} onClick={this.props._layouts.toggleLayoutEdit}>Edit Layout</button>
        <StateManagement />
      </div>
    )
  }
}

Header.defaultProps= {
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    _layouts: bindActionCreators(layoutsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
