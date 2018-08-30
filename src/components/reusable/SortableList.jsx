import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import DragHandleImage from '../../images/drag-handle.png';

export const DragHandle = SortableHandle(() =>
  <img className="drag-handle" src={DragHandleImage} width={18} alt="::" />
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
