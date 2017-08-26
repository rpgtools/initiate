import React, {Component} from 'react';

//Components
import StateManagement from './StateManagement';

export default class Header extends Component {
  render() {
    return(
      <div className='header'>
        <StateManagement />
      </div>
    )
  }
}
