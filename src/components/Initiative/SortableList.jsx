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

const SortableItem = SortableElement(({creature, ...tokenActions}) =>
  <InitiativeToken
    key={creature.id}
    creature={creature}
    {...tokenActions}
  />
);

const SortableList = SortableContainer(({items, ...tokenActions}) => {
  return (
    <div className="initiative__sortable-list-container">
      {items.map((creature, index) => (
        <SortableItem
          key={creature.id}
          index={index}
          creature={creature}
          {...tokenActions}
        />
      ))}
    </div>
  );
});

export default SortableList;
