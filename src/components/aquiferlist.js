// components/recordlist.js

import React, { Component } from 'react';
import Aquifer from './aquifer';

class AquiferList extends Component {
	render() {
		var names = [];
		var changeCallBack = this.props.changeAquifer.bind(this);
		for (var property in this.props.data) {
			if (this.props.data.hasOwnProperty(property)) {
				var aquifer = {
					key: property,
					name: property,
					user: this.props.data[property][0].user,
				};
				names.push(aquifer);
			}
		}
		let aquiferNodes = names.map(function(aquifer) {
			return (
				<Aquifer 
					key={aquifer.key}
					name={aquifer.name}
					user={aquifer.user}
					aquiferChange={changeCallBack}> </Aquifer>
			)
		})
		return (
			<div>
			{aquiferNodes}
			</div>
		)
	}
}

export default AquiferList;