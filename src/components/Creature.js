import React from 'react';
import {Counter} from './Counter'

export class Creature extends React.Component {
	render() {
		return(<Counter count="42" />);
	}
}
