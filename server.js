// server.js
// usage: node server.js AUTH_TOKEN

var http = require('http');
var groupme = require('groupme').Stateless;

if (process.argv.length !== 3) {
  process.exit(1);
}

var token = process.argv[2];
var bot_id = 'c79491442177436efbbc76f304';

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
    var text = req.body;
    console.log('TEXT: \n' + text);
    groupme.Bots.post(token, bot_id, text, {}, justPrintEverythingCallback);
  }
  res.writeHead(200);
  res.end();
});

server.listen(process.env.PORT, process.env.IP);