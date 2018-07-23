/* @TODO:

 TODOS:
  * Rename to View (see: https://unbug.gitbooks.io/react-native-training/content/45_naming_convention.html)
  * Put counters as properties on creatures(label:value pairs)
  * EVENTUALLY: Figure out saving settings for counters
  */


// Libs
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import React from 'react';

// Child Components
import Counter from '../components/Counter';
import CreateButton from '../components/CreateButton';
import InitiativeToken from '../components/InitiativeToken';
import SortableList from '../components/SortableList';

// Actions
import * as creatureActions from '../actions/creatures';
import * as timerActions from '../actions/timers';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: 1};
  };

  handleCreatureCreate = (name) => {
    this.props.actions.creature.creatureCreate({name});
  };

  handleNextTurn = () => {};

  handleSortEnd = ({oldIndex, newIndex}) => {};

  render() {
    const { creatures, creatureIds } = this.props;
    return (
      <div className="initiative">
        <SortableList
          items={creatureIds.map(creatureId => creatures[creatureId], [])}
          onSortEnd={this.handleSortEnd}
        />
        <CreateButton
          onSubmit={this.handleCreatureCreate}
          buttonLabel="New Creature"
        />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    creatureIds: state.creatures.allIds,
    creatures: state.creatures.byId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      creature: bindActionCreators(creatureActions, dispatch),
      timer: bindActionCreators(timerActions, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
