import React from 'react';
import ReactDOM from 'react-dom';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';

export const DragHandle = SortableHandle(() =>
  <div className="drag-handle" />
);

const SortableItem = SortableElement(({item, ...rest}) =>
  <div className="sortable-item">{item}</div>
);

const SortableListContainer = SortableContainer(({items, ...rest}) => {
  return (
    <div className="sortable-list-container" {...rest}>
      {items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} />
      ))}
    </div>
  );
});

export default class SortableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this);
    elem.addEventListener('scroll', this.handleScroll);
    this.setState({scrollTop: elem.scrollTop});
  };

  componentWillUnmount() {
    const elem = ReactDOM.findDOMNode(this);
    elem.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const elem = ReactDOM.findDOMNode(this);
    this.setState({scrollTop: elem.scrollTop})
  }

  render() {
    const {items, ...rest} = this.props;
    return(
      <div className="scrollable-list" style={{overflowY: "auto", height: "100%"}}>
        <SortableListContainer
          onScroll={this.handleScroll}
          items={items.map((item, index) => {
            return React.cloneElement(item, {scrollTop: this.state.scrollTop});
          })}
          {...rest}
        />
      </div>
    );
  }
}
