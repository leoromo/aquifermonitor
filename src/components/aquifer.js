// components/record.js

import React, {Component} from 'react';
import '../App.css';

class Aquifer extends Component {
	constructor(props) {
		super(props);

		this.clickAlert = this.clickAlert.bind(this);
	}

	clickAlert() {
		this.props.aquiferChange(this.props.name);
	}

	render() {
		return (
			<div className='App-aquifer' onClick={this.clickAlert}>
			<h3> {this.props.name} </h3>
			<p> User: {this.props.user} </p>
			</div>
		)
	}
}

export default Aquifer;