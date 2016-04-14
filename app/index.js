//Require all the necessary packages
var express = require('express');
var mongoose = require('mongoose');
var socketIO = require('socket.io');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
//Config file
var config = require('./config');

//App configuration
//Use body parser to get POST values
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS request enabled
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//Set assets folder
app.use(express.static(__dirname + '/client'));

//Log all requests on console
app.use(morgan('dev'));

//Database connection
mongoose.connect(config.DATABASE);

//Index endpoint
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

//Mini Api
var miniApi = require('./server/routes/miniApi')(express);
app.use('/api', miniApi);
//Comment Api
var commentApi = require('./server/routes/commentApi')(express);
app.use('/api', commentApi);

//Starting server
app.listen(config.PORT);

console.log('Server started on',config.PORT);
