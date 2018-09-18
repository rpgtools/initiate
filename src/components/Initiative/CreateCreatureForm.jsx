import React from 'react';
import SingleInputForm from '../reusable/SingleInputForm';

export default class CreateCreatureForm extends React.Component {
  handleCreateCreatureSubmit = (name) => {
    this.props.createCreature({ name, counters: [{ label: 'HP', value: 0 }] });
  }

  render() {
    return(
      <div className="create-creature-form">
        <SingleInputForm placeholder="Enter a name..." onSave={this.handleCreateCreatureSubmit}/>
      </div>
    );
  }
}
