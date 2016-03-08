var express = require('express');
var path = require('path');
var app = express();
//Using config.js file
var config = require('./config');
//Using our functions on mathFunctions.js
var MathFunctions = require('./mathFunctions');

//Middleware
app.use(function(req, res, next){
  console.log('Do something...');
  next();
});

//Router
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/sum/:a/:b', function(req, res){
  res.send(MathFunctions.sum(req.params.a, req.params.b));
});

app.get('/home', function(req, res){
  res.send('This will become Home Page');
});

app.get('/moduleVariable', function(req, res){
  res.send(config.someVariable);
});

app.get('/name/:userName/:lastName', function(req, res){
  var userName = req.params.userName;
  var lastName = req.params.lastName;
  res.send("Hello  " + userName + " " + lastName);
});

//app.listen(8080);
app.listen(config.port);
console.log('Server Running on port ' + config.port);
