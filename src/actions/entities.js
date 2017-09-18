const uuid = require('uuid/v4');

export const entityCreate = entity => {
  return {
    type: 'ENTITY_CREATE',
    entity: {
      ...entity,
      id: uuid(),
      counterIds: [],
    }
  };
};

export const entityUpdate = entity => {
  return {
    type: 'ENTITY_UPDATE',
    entity
  };
};

export const entityDelete = entity => {
  return {
    type: 'ENTITY_DELETE',
    entity
  };
};

export const reorderCreatures = (previousIndex, nextIndex) => {
  return {
    type: 'ENTITY_REORDER',
    previousIndex,
    nextIndex
  };
};
