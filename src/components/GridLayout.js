import {connect} from 'react-redux';
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {Responsive, WidthProvider} from 'react-grid-layout';
//to be props in da future
import Header from './Header';
import CreatureList from './CreatureList';

//actions
import * as layoutsActions from '../actions/layouts'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class GridLayout extends Component {
  handleLayoutChange = (layouts) => {
    this.props._layouts.updateLayouts(layouts)
  }

  render() {
    const { layouts } = this.props;
    return (
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{all: layouts}}
        breakpoints={{all: 0}}
        cols={{all: 12}}
        rowHeight={30}
        autoSize={true}
        onLayoutChange={this.handleLayoutChange}>
        <div key={'a'}><Header /></div>
        <div key={'b'}><CreatureList /></div>
      </ResponsiveReactGridLayout>
    )
  }
}

GridLayout.defaultProps= {
  layouts: [
    {i: 'a', x: 0, y: 0, w: 12, h: 1, static: true},
    {i: 'b', x: 0, y: 1, w: 6, h: 6}
  ]
}

const mapStateToProps = (state) => {
  return {
    layouts: state.display.layout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _layouts: bindActionCreators(layoutsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayout);
