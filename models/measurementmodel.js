// models/measurementmodel.js

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PiezolectMeasurementSchema = new Schema ({
	device_id : Number,
	raw_measurement : Number,
	measurement : Number
});

module.exports = mongoose.model('PiezolectMeasurement', PiezolectMeasurementSchema, 'device_records');