import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';

export const DragHandle = SortableHandle(({children}) =>
  <div className="sortable-list__drag-handle">
    {children}
  </div>
);

const SortableItem = SortableElement(({item, ...rest}) =>
  <div className="sortable-list__element" {...rest}>
    {item}
  </div>
);

const SortableList = SortableContainer(({children, ...rest}) => {
  return (
    <div className="sortable-list">
      {children.map((child, index) => (
        <SortableItem
          index={index}
          key={index}
          item={child}
          {...rest}
        />
      ))}
    </div>
  );
});

export default SortableList;
