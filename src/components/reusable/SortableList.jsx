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

const SortableList = SortableContainer(({items, ...rest}) => {
  return (
    <div className="sortable-list">
      {items.map((item, index) => (
        <SortableItem
          index={index}
          item={item}
          {...rest}
        />
      ))}
    </div>
  );
});

export default SortableList;
