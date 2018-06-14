// server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var PiezolectDevice = require('./models/devicemodel');
var DeviceRouter = require('./routes/deviceroutes');
var TestRouter = require('./routes/testroutes');

var PiezolectMeasurement = require('./models/measurementmodel');
var MeasurementRouter = require('./routes/measurementroutes')
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
	res.json({message: 'WaterWatch API Initialized'});
});

// Testing routes
router.route('/test')
.get(TestRouter.test);

// Add measurements
router.route('/measurements')
.get(MeasurementRouter.findAll)
.post(MeasurementRouter.addRecord);

router.route('/measurements/:id')
.get(MeasurementRouter.findRecordById)
.delete(MeasurementRouter.deleteRecord);

router.route('/measurements/by_device/:device_id')
.get(MeasurementRouter.findRecordsByDeviceId);

// Add devices
router.route('/devices')
.get(DeviceRouter.findAll)
.post(DeviceRouter.addDevice);

router.route('/devices/by_user/:user')
.get(DeviceRouter.findDevicesByUser);

router.route('/devices/by_name/:name')
.get(DeviceRouter.findDeviceByName);

router.route('/devices/:id')
.delete(DeviceRouter.deleteDevice);

app.use('/', router);

var db = require('./config/config');
mongoose.connect(db.url, {useMongoClient:true}, function(err, res) {
	if (err)
		console.log(err);
	app.listen(port, function() {
		console.log('Listening on port ' + port);
	})
});

