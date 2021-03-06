// components/record.js

import React, {Component} from 'react';
import '../App.css';

class Record extends Component {
	render() {
		var date = new Date(this.props.date * 1000);
		return (
			<div className='App-record'>
			<h3> {this.props.name} </h3>
			<p> Location: {this.props.lat}, {this.props.lon} </p>
			<p> Date: {date.toString()} </p>
			<p> Water Level: {this.props.data} </p>
			<p> User: {this.props.user} </p>
			</div>
		)
	}
}

export default Record;