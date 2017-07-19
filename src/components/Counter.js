import React from 'react';

export class Counter extends React.Component {
	render() {
		return(<div>{this.props.count}</div>);
	}
}
