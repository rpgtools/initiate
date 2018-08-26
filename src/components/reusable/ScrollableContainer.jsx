import React from 'react';
import ReactDOM from 'react-dom';

class ScrollableContainer extends React.Component {
  componentDidUpdate() {
    const elem = ReactDOM.findDOMNode(this);
    elem.scrollTop = elem.scrollHeight;
  }

  render() {
    return (
      <div style={{overflowY:"scroll", height:"100%"}} className="scrollable">
        {this.props.children}
      </div>
    );
  }
}

export default ScrollableContainer;
