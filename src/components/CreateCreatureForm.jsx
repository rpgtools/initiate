import React from 'react';

export default class CreateCreatureForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <form>
        <label>
          Name:
          <input type="text" name="name" autoFocus />
        </label>
        <input type="submit" value="Submit" />
        <input type="button" value="Cancel" />
      </form>
    );
  }
};
