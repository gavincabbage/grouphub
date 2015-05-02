// server.js
// usage: node server.js AUTH_TOKEN

var fs = require('fs');
var secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));

var http = require('http');
var groupme = require('groupme').Stateless;
var github = require('github-webhook-handler')({ path: '/', secret: secrets.secret });

var token = process.argv[2];
var bot_id = 'c79491442177436efbbc76f304';

var botCallback = function(err, ret) {
    if (!err) {
        console.log(JSON.stringify(ret, null, ''));
    } else {
        console.warn('botCallback error:', err);
    }
}

github.on('push', function (event) {
    
    console.log('Received a push event for %s to %s from %s',
        event.payload.repository.name,
        event.payload.ref,
        event.payload.pusher.name);
        
    groupme.Bots.post(token, bot_id, event.payload.pusher.name, {}, botCallback);
})

var server = http.createServer(function (req, res) {
    github(req, res, function (err) {
        res.statusCode = 404;
        res.end();
    })
});

server.listen(process.env.PORT, process.env.IP);
