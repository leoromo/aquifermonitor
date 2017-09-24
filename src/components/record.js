// components/record.js

import React, {Component} from 'react';

class Record extends Component {
	render() {
		var date = new Date(this.props.date * 1000);
		return (
			<div>
			<h3> {this.props.name} </h3>
			<p> Location: {this.props.lat}, {this.props.lon} </p>
			<p> Date: {date.toString()} </p>
			<p> Water Level: {this.props.data} </p>
			</div>
		)
	}
}

export default Record;