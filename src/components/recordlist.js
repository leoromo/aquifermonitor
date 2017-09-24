// components/recordlist.js

import React, { Component } from 'react';
import Record from './record';

class RecordList extends Component {
	render() {
		let recordNodes = this.props.data.map(function(record) {
			return (
				<Record 
				key={record._id}
				date={record.date} 
				name={record.name} 
				data={record.data}
				lat={record.location.lat}
				lon={record.location.lon}
				user={record.user}>
				</Record> 
				)
			})
		return (
			<div>
			{recordNodes}
			</div>
		)
	}
}

export default RecordList;