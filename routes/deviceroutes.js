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

exports.addRecord = function(req, res) {
	var device = new PiezolectDevice();
	device.name = req.body.name;
	device.location = req.body.location;
	device.user = req.body.user;
	device.id = req.body.id;
	device.save(function(err) {
		if (err)
			res.send(err);
		res.json({message: 'OK'});
	});
}

// exports.findRecordsByName = function(req, res) {
// 	WaterRecord.find({name:req.params.name}, function(err, records) {
// 		if (err)
// 			res.send(err);
// 		res.json(records);
// 	});
// }

// exports.findRecordsByUser = function(req, res) {
// 	WaterRecord.find({user:req.params.user}, function(err, records) {
// 		if (err)
// 			res.send(err);
// 		res.json(records);
// 	});
// }

// exports.findRecordById = function(req, res) {
// 	WaterRecord.findById(req.params.id, function (err, record) {
// 		if (err)
// 			res.send(err);
// 		res.json(record);
// 	});
// }

exports.deleteRecord = function(req, res) {
	PiezolectDevice.remove({_id:req.params.id}, function(err, record) {
		if (err)
			res.send(err);
		res.json('Deleted');
	});
}