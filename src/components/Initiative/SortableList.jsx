import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import InitiativeToken from './InitiativeToken';
import DragHandleImage from '../../images/drag-handle.png';

export const DragHandle = SortableHandle(() =>
  <img className="drag-handle" src={DragHandleImage} width={18} alt="::" />
);

const SortableItem = SortableElement(({creature, ...rest}) =>
  <InitiativeToken
    key={creature.id}
    creature={creature}
    {...rest}
  />
);

let ref = React.createRef();

const SortableList = SortableContainer(({items, ...rest}) => {
  return (
    <div className="initiative__sortable-list-container">
      {items.map((creature, index) => (
        <SortableItem
          key={creature.id}
          index={index}
          creature={creature}
          {...rest}
        />
      ))}
    </div>
  );
});

export default SortableList;
