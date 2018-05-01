'use strict'

var mongoose = require('mongoose');
var PiezolectDevice = require('../models/devicemodel')
var PiezolectMeasurement = mongoose.model('PiezolectMeasurement');

exports.findAll = function(req, res) {
	PiezolectMeasurement.find(function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
}

exports.addRecord = function(req, res) {
	var measurement = new PiezolectMeasurement();
	measurement.device_id = req.body.device_id;

	// Measurement in V
	measurement.raw_measurement = req.body.raw_measurement;

	// Convert raw_measurement to voltage measurement
	// measurement.measurement = measurement.raw_measurement * 5.0 / 1023;

	// Convert V measurement to height measurement
	measurement.measurement = (measurement.raw_measurement - 1) * (200.0 / 4.0);

	measurement.save(function(err) {
		if (err)
			res.send(err);
		res.json({message: 'OK'});
	});
}

exports.findRecordsByDeviceId = function(req, res) {
	DeviceMeasurement.find({device_id:req.params.device_id}, function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	})
}

exports.findRecordById = function(req, res) {
	DeviceMeasurement.findById(req.params.id, function (err, record) {
		if (err)
			res.send(err);
		res.json(record);
	});
}

exports.deleteRecord = function(req, res) {
	PiezolectMeasurement.remove({_id:req.params.id}, function(err, record) {
		if (err)
			res.send(err);
		res.json('Deleted');
	});
}