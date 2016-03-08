var http = require('http'), fs = require('fs');

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  var readStream = fs.createReadStream(__dirname + '/index.html');
  readStream.pipe(res);
}).listen(8080);

console.log('Server Running on port 8080');
