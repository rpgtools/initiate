import React from 'react';
import SingleInputForm from '../reusable/SingleInputForm';
import classNames from 'classnames';

export default class CreateCreatureForm extends React.Component {
  handleCreateCreatureSubmit = (name) => {
    this.props.createCreature(name);
  }

  render() {
    return(
      <SingleInputForm placeholder="Enter a name..." onSubmit={this.handleCreateCreatureSubmit}/>
    );
  }
}
