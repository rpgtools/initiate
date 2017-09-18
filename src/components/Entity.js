// Libs
import React from 'react';

// Child Components

export class Entity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  };

  handleCounterSubmit = label => {
    this.props.onCounterSubmit({label, entityId: this.props.entity.id});
  };

  handleCreatureDelete = () => {
    this.props.onCreatureDelete(this.props.entity);
  };

  toggleCreatureEdit = () => {
    this.setState({editing: !this.state.editing});
  };

  render() {
    const {entity} = this.props;
    const className = (!this.state.editing) ? "entity" : "entity editing";
    return(
      <div className={className}>
        <h2 className="entity_name">{entity.name}</h2>
        <button className="button__edit" onClick={this.toggleCreatureEdit} >Edit Entity</button>
        <button className="button__delete" onClick={this.handleCreatureDelete} >Delete Entity</button>
      </div>
    );
  };
};
