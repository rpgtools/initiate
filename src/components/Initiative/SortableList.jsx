import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import InitiativeToken from './InitiativeToken';

const SortableItem = SortableElement(({creature}) =>
  <InitiativeToken
    key={creature.id}
    creature={creature}
  />
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="SortableList">
      {items.map((creature, index) => (
        <SortableItem key={creature.id} index={index} creature={creature} />
      ))}
    </div>
  );
});

export default SortableList;
