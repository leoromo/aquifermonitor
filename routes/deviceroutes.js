'use strict'

var mongoose = require('mongoose');
var PiezolectDevice = mongoose.model('PiezolectDevice');

exports.findAll = function(req, res) {
	PiezolectDevice.find(function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
}

exports.addDevice = function(req, res) {
	var device = new PiezolectDevice();
	device.name = req.body.name;
	device.location = req.body.location;
	device.user = req.body.user;
	device.id = req.body.id;

	var saveDevice = false;
	// Verify that device id does not already exist in the DB
	PiezolectDevice.find({id: device.id}, function(err, records) {
		if (err)
			res.send(err);
		if (records.length > 0) {
			console.log ('Device Id already in use');
			res.status(400);
			res.json({message: 'Device Id already exists'});
		}
		else {
			console.log ('Device Id not used, saving device');
			device.save(function(err) {
				if (err)
					res.send(err);
				res.json({message: 'OK'});
			});
		}
	});
}

exports.findDevicesByUser = function(req, res) {
	PiezolectDevice.find({user:req.params.user}, function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
}

exports.findDeviceByName = function(req, res) {
	PiezolectDevice.find({name:req.params.name}, function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
}

// exports.findRecordById = function(req, res) {
// 	WaterRecord.findById(req.params.id, function (err, record) {
// 		if (err)
// 			res.send(err);
// 		res.json(record);
// 	});
// }

exports.deleteDevice = function(req, res) {
	PiezolectDevice.remove({_id:req.params.id}, function(err, record) {
		if (err)
			res.send(err);
		res.json('Deleted');
	});
}