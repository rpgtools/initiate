import React from 'react';

export class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showForm: false,
			value: props.count.toString(),
		}
		this.onClickDecrement = this.onClickDecrement.bind(this);
		this.onClickIncrement = this.onClickIncrement.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleForm = this.toggleForm.bind(this);

	}

	componentWillReceiveProps(nextProps) {
		this.setState({value: nextProps.count.toString()})
	}

	onClickDecrement(event) {
		this.props.handleClickDecremenent({id: this.props.id, count: this.props.count}, event)
	}

	onClickIncrement(event) {
		this.props.handleClickIncrement({id: this.props.id, count: this.props.count}, event)
	}

	handleChange(event) {
    this.setState({value: event.target.value});
  }

	handleSubmit(event) {
		this.props.handleSetCount({id: this.props.id, count: parseInt(this.state.value,10)})
		this.toggleForm()
		event.preventDefault()
	}

	handleFocus(event) {
	  event.target.select();
	}

	toggleForm() {
		this.setState({showForm: !this.state.showForm});
	}

	render() {
		if(this.state.showForm) {
			return(
				<div className="counter_widget counter_widget__edit">
					<form onSubmit={this.handleSubmit}>
						<input autoFocus type="text" value={this.state.value} onChange={this.handleChange} onFocus={this.handleFocus} />
						<input type="submit" value="Save" />
					</form>
				</div>
			);
		}
		return(
      <div className="counter_widget">
				<button className="button button__increment" onClick={(event) => this.onClickIncrement(event)}>{this.props.incrementLabel}</button>
				<a className="counter_count" onClick={this.toggleForm}>{this.props.count}</a>
        <span className="counter_label">{this.props.label}</span>
				<button className="button button__decrement" onClick={(event) => this.onClickDecrement(event)}>{this.props.decrementLabel}</button>
      </div>
    );
	}
}
