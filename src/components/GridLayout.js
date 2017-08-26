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
        draggableCancel=".no-gl-drag"
        onLayoutChange={this.handleLayoutChange}>
        <div className="gl-frame" key={'a'}><Header /></div>
        <div  key={'b'}>
          <div className="gl-frame">
          <h1>Initiative</h1>
          <div className="no-gl-drag" style={{clear:"both"}}>
            <CreatureList />
          </div>
          </div>
        </div>
      </ResponsiveReactGridLayout>
    )
  }
}

GridLayout.defaultProps= {
  layouts: [
    {i: 'a', x: 0, y: 0, w: 12, h: 2, static: true},
    {i: 'b', x: 0, y: 2, w: 6, h: 6}
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
