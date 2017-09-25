// components/aquifergraph.js

import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class AquiferGraph extends Component {

	render() {
		if (this.props.data.length > 0){
			var chartData = [];
			this.props.data.forEach(function(record) {
				var date = new Date(record.date * 1000);
				var entry = {
					//x: date.getHours() + date.getMinutes()/60 + date.getSeconds()/3600,
					x: record.date,
					y: Number(record.data)
				};
				chartData.push(entry);
			});
			return (
				<LineChart width={600}
							height={300}
							data={chartData}
							margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
				<XAxis dataKey='x'/>
				<YAxis/>
				<CartesianGrid />
				<Tooltip/>
				<Legend/>
				<Line type='monotone' dataKey='y' stroke="#0066ff" strokeWidth={3} name='water level'/>
				</LineChart>
			)
		}
		else {
			return (
				<p> 'Empty graph' </p>
			)
		}
	}
}

export default AquiferGraph;