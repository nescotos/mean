var express = require('express');
var path = require('path');
var app = express();
var MathFunctions = require('./mathFunctions');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(function(req, res, next){
  console.log('Doing something!!');
  next();
})

app.get('/home', function(req, res){
  res.send('Home Page');
})

app.get('/sum/:a/:b', function(req, res){
  res.send(MathFunctions.sum(req.params.a, req.params.b));
});

app.post('/login', function(req, res){
  res.send('Logging in');
})

app.get('/name/:userName/:lastName', function(req, res){
  var userName = req.params.userName;
  var lastName = req.params.lastName;
  res.send("Hello  " + userName + " " + lastName);
});

app.listen(3030);

console.log('Server running on 3030');
