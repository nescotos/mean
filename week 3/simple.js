var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hola Mundo');
});


app.get('/adios', function(req, res){
  res.send('adios Mundo');
});
app.listen(3000);

console.log('Server Running on port 3000');
