// Libs
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

// Child Components
import {Entity} from './Entity'
import {CreateButton} from './CreateButton'

// Actions
import * as entityActions from '../actions/entities';

class EntitiesList extends React.Component {
  onEntitySubmit = name => {
    this.props._entity.entityCreate({name})
  };

  handleCreatureDelete = (entity) => {
    this.props._entity.entityDelete(entity)
  };

  render() {
    const entities = [];
    if(this.props.entityIds.length > 0) {
      _.forEach(this.props.entityIds, (entityId) => {
        const entity   = this.props.entities[entityId];
        entities.push(
          <Entity
            key={entity.id}
            entity={entity}
            onEntityDelete={this.handleEntityDelete}
          />
        );
      });
    };

    return(
      <div className="entity-list">
        {entities}
        <div>
          <CreateButton
            onSubmit={this.onEntitySubmit}
            buttonLabel="New Entity" />
        </div>
      </div>
    );
  };
};

EntitiesList.propTypes = {
  entitiesIds: PropTypes.array,
  entities: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    counterIds: PropTypes.array
  })),
};

const mapStateToProps = (state) => {
  return {
    entityIds: state.entities.allIds,
    entities: state.entities.byId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _entity: bindActionCreators(entityActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesList);
