// components/record.js

import React, {Component} from 'react';

class Record extends Component {
	render() {
		var date = new Date(this.props.date * 1000);
		return (
			<div>
			<h3>{'Measurement'}</h3>
			{this.props.name} {date.toString()} {this.props.data}
			</div>
		)
	}
}

export default Record;