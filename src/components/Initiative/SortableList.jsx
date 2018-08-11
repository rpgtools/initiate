import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import InitiativeToken from './InitiativeToken';

const SortableItem = SortableElement(({creature, ...actions}) =>
  <InitiativeToken
    key={creature.id}
    creature={creature}
    {...actions}
  />
);

const SortableList = SortableContainer(({items, ...actions}) => {
  return (
    <div className="SortableList">
      {items.map((creature, index) => (
        <SortableItem key={creature.id} index={index} creature={creature} {...actions} />
      ))}
    </div>
  );
});

export default SortableList;
