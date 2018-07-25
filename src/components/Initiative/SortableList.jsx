import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import InitiativeToken from './InitiativeToken';

export const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({creature, ...tokenActions}) =>
  <InitiativeToken
    key={creature.id}
    creature={creature}
    {...tokenActions}
  />
);

const SortableList = SortableContainer(({items, ...tokenActions}) => {
  return (
    <div className="SortableList">
      {items.map((creature, index) => (
        <SortableItem key={creature.id} index={index} creature={creature} {...tokenActions} />
      ))}
    </div>
  );
});

export default SortableList;
