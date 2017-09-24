// model/waterrecord.js

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WRecordSchema = new Schema ({
	name: String,
	location: Schema.Types.Mixed,
	user: String,
	date: Number,
	data: String
});

module.exports = mongoose.model('WaterRecord', WRecordSchema, 'records');