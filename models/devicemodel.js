// models/devicemodel.js

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PiezolectDeviceSchema = new Schema ({
	name: String,
	location: Schema.Types.Mixed,
	user: String,
	id: Number
});

module.exports = mongoose.model('PiezolectDevice', PiezolectDeviceSchema, 'devices');