import React from 'react';

class ScrollContainer extends React.Component {
  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div style={{overflowY:"auto", height:"100%"}} className={"scrollable " + className} {...rest}>
        {children}
      </div>
    );
  }
}

export default ScrollContainer;
