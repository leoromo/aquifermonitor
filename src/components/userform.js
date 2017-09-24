// components/userform.js

import React, { Component } from 'react';

class UserForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: ''
		};
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	handleUserChange(e) {
		this.setState({user: e.target.value});
	}

	render() {
		return (
			<form>
			<input 
				type='text' 
				placeholder='your username...' 
				value={this.state.user}
				onChange={this.handleUserChange} />
			<input
				type='button'
				value='Search'
				onClick={this.props.changeUser.bind(this, this.state.user)} />
			</form>
		)
	}
}

export default UserForm;