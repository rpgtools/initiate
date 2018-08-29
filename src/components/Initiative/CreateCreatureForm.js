import React from 'react';
import SingleInputForm from '../reusable/SingleInputForm';
import classNames from 'classnames';

export default class CreateCreatureForm extends React.Component {
  handleCreateCreatureSubmit = (name) => {
    this.props.createCreature(name);
  }

  render() {
    return(
      <div className="create-creature-form">
        <SingleInputForm placeholder="Enter a name..." onSave={this.handleCreateCreatureSubmit}/>
      </div>
    );
  }
}
