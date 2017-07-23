import React from 'react';

export class Counter extends React.Component {
	constructor(props) {
		super(props);

		this.onClickDecrement = this.onClickDecrement.bind(this);
		this.onClickIncrement = this.onClickIncrement.bind(this);
	}

	onClickDecrement() {
		this.props.onClickDecrement({id: this.props.id, count: this.props.count})
	}

	onClickIncrement() {
		console.log(this)
		this.props.onClickIncrement({id: this.props.id, count: this.props.count})
	}

	render() {
		return(
      <div className="counter_widget">
				<button className="button button__increment" onClick={this.onClickIncrement}>{this.props.incrementLabel}</button>
				{this.props.count}
        <span className="Label">{this.props.label}</span>
				<button className="button button__decrement" onClick={this.onClickDecrement}>{this.props.decrementLabel}</button>
      </div>
    );
	}
}
