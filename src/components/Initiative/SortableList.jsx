import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import InitiativeToken from './InitiativeToken';

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
