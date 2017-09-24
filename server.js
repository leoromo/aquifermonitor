// server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var WaterRecord = require('./models/waterrecord');
var RecordsRouter = require('./routes/waterrecords');
mongoose.Promise = require('bluebird');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 8000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

router.get('/', function(req, res) {
	res.json({message: 'WaterWatch API Initialized'});
});

router.route('/records')
.get(RecordsRouter.findAll)
.post(RecordsRouter.addRecord);

router.route('/records/name/:name')
.get(RecordsRouter.findRecordsByName);

router.route('/records/user/:user')
.get(RecordsRouter.findRecordsByUser);

router.route('/records/:id')
.get(RecordsRouter.findRecordById)
.delete(RecordsRouter.deleteRecord);

app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/mydb', {useMongoClient:true}, function(err, res) {
	if (err)
		console.log(err);
	app.listen(port, function() {
		console.log('Listening on port ' + port);
	})
});

