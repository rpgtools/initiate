import React from 'react';
import ReactDOM from 'react-dom';

class ScrollableContainer extends React.Component {
  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div style={{overflowY:"auto", height:"100%"}} className={"scrollable " + className} {...rest}>
        {children}
      </div>
    );
  }
}

export default ScrollableContainer;
