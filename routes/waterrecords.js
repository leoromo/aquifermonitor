'use strict'

var mongoose = require('mongoose');
var WaterRecord = mongoose.model('WaterRecord');

exports.findAll = function(req, res) {
	WaterRecord.find(function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
}

exports.addRecord = function(req, res) {
	var record = new WaterRecord();
	record.name = req.body.name;
	record.location = req.body.location;
	record.user = req.body.user;
	record.date = req.body.date;
	record.data = req.body.data;
	record.save(function(err) {
		if (err)
			res.send(err);
		res.json({message: 'OK'});
	});
}

exports.findRecordsByName = function(req, res) {
	WaterRecord.find({name:req.params.name}, function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
}

exports.findRecordsByUser = function(req, res) {
	WaterRecord.find({user:req.params.user}, function(err, records) {
		if (err)
			res.send(err);
		res.json(records);
	});
}

exports.findRecordById = function(req, res) {
	WaterRecord.findById(req.params.id, function (err, record) {
		if (err)
			res.send(err);
		res.json(record);
	});
}

exports.deleteRecord = function(req, res) {
	WaterRecord.remove({_id:req.params.id}, function(err, record) {
		if (err)
			res.send(err);
		res.json('Deleted');
	});
}