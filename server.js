// server.js
// usage: node server.js AUTH_TOKEN

var http = require('http');
var groupme = require('groupme').Stateless;

if (process.argv.length !== 3) {
    process.exit(1);
}

var token = process.argv[2];
var bot_id = 'c79491442177436efbbc76f304';

var botCallback = function(err, ret) {
    if (!err) {
        console.log(JSON.stringify(ret, null, ''));
    } else {
        console.warn('botCallback:', err);
    }
}


var server = http.createServer(function(req, res) {
  
  if (req.method === 'POST') {
      
    console.log('got a POST request');
    var body = '';
    
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6) {
            body = '';
            req.connection.destroy();
        }
    });
    
    req.on('end', function () {
        console.log(body);
        var pusher = JSON.parse(body).pusher.name;
        if (pusher !== null) {
            groupme.Bots.post(token, bot_id, pusher, {}, botCallback);
        }
    });
  }
  
  res.writeHead(200);
  res.end();
});

server.listen(process.env.PORT, process.env.IP);