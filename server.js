// server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var WaterRecord = require('./models/waterrecord');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 8000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

router.get('/', function(req, res) {
	res.json({message: 'WaterWatch API Initialized'});
});

router.route('/records')
	.get(function(req, res) {
		WaterRecord.find(function(err, records) {
			if (err)
				res.send(err);
			res.json(records);
		});
	})
	.post(function(req, res) {
		var record = new WaterRecord();
		record.name = req.body.name;
		record.location.lat = req.body.location.lat;
		record.location.lon = req.body.location.lon;
		record.user = req.body.user;
		record.date = req.body.date;
		record.data = req.body.data;
		record.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'OK'});
		});
	});

app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/mydb', {useMongoClient:true}, function(err, res) {
	if (err)
		console.log(err);
	app.listen(port, function() {
		console.log('Listening on port ' + port);
	})
});

