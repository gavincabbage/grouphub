var http = require('http');
var groupme = require('groupme');

var server = http.createServer(function(req, res) {
  
  if (req.method === 'POST') {
    console.log('got a POST request');
  }
  
  res.writeHead(200);
  res.end();
});

server.listen(process.env.PORT, process.env.IP);