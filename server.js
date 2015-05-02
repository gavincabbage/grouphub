// server.js
// usage: node server.js AUTH_TOKEN

var http = require('http');
var groupme = require('groupme').Stateless;

if (process.argv.length !== 3) {
  process.exit(1);
}

var token = process.argv[2];
var group = 13781399;
var opts = 
  { 
    message: 
    {
      source_guid: '234', 
      text: 'test message'
    }
  };

var justPrintEverythingCallback = function(err, ret) {
  if (!err) {
    console.log(JSON.stringify(ret, null, " "));
  } else {
    console.log("ERROR!", err)
  }
}

var server = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    console.log('got a POST request');
    groupme.Messages.create(token, group, opts, justPrintEverythingCallback);
  }
  res.writeHead(200);
  res.end();
});

server.listen(process.env.PORT, process.env.IP);