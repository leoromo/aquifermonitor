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

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

router.get('/', function(req, res) {
	// res.json({message: 'WaterWatch API Initialized'});
	res.send('CONNECT');
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

app.use('/', router);

var db = require('./config/config');
mongoose.connect(db.url, {useMongoClient:true}, function(err, res) {
	if (err)
		console.log(err);
	app.listen(port, function() {
		console.log('Listening on port ' + port);
	})
});

