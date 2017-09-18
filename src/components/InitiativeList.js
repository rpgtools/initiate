// Libs
import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

// Child Components
import {Creature} from './Creature'
import {CreateButton} from './CreateButton'

// Actions
import * as entityActions from '../actions/entities';
import * as counterActions from '../actions/counters';
import * as layoutActions from '../actions/layouts';


const SortableItem = SortableElement(({value}) =>
  <div className="SortableItem">{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="SortableList">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class InitiativeList extends React.Component {
  onAdvanceInitiative = () => {
    this.props._layout.reorderTokens(0, -1);
  };

  onCreatureSubmit = name => {
    this.props._entity.entityCreate({name})
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props._layout.reorderTokens(oldIndex, newIndex);
  };

  handleCounterSubmit = counter => {
    this.props._counter.counterCreate(counter)
  };

  handleCreatureDelete = (entity) => {
    this.props._entity.entityDelete(entity)
  };

  handleCounterDelete = (counter) => {
    this.props._counter.counterDelete(counter);
  };

  render() {
    const entities = [];
    if(this.props.entityIds.length > 0) {
      _.forEach(this.props.entityIds, (entityId) => {
        const entity   = this.props.entities[entityId];
        const counters = _.pick(this.props.counters, entity.counterIds);
        entities.push(
          <Token
            key={entity.id}
            entity={entity}
            counters={counters}
            onCounterSubmit={this.handleCounterSubmit}
            onCreatureDelete={this.handleCreatureDelete}
          />
        );
      });
    };

    return(
      <div className="entity-list">
        <SortableList
          items={entities}
          onSortEnd={this.onSortEnd}
          distance={10} />
        <div>
          <button
            className="button button_advance_initiative"
            onClick={this.onAdvanceInitiative}>Advance Initiative
          </button>
        </div>
        <div>
          <CreateButton
            onSubmit={this.onCreatureSubmit}
            buttonLabel="New Creature" />
        </div>
      </div>
    );
  };
};

CreatureList.propTypes = {
  entitiesIds: PropTypes.array,
  entities: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    counterIds: PropTypes.array
  })),
  counters: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.string,
    entityId: PropTypes.string,
    count: PropTypes.number
  }))
};

const mapStateToProps = (state) => {
  return {
    entityIds: state.display.initiative,
    entities: state.entities.byId,
    counters: state.counters.byId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _entity: bindActionCreators(entityActions, dispatch),
    _counter: bindActionCreators(counterActions, dispatch),
    _layout: bindActionCreators(layoutActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);
