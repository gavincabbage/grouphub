var fs = require('fs');
var secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var github_config = { path: config.paths.webhook, secret: secrets.secret };

var http = require('http');
var groupme = require('groupme').Stateless;
var github = require('github-webhook-handler')(github_config);

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
        
    groupme.Bots.post(secrets.token, secrets.bot_id, event.payload.pusher.name, {}, botCallback);
})

var server = http.createServer(function (req, res) {
    github(req, res, function (err) {
        res.statusCode = 404;
        res.end();
    })
});

server.listen(process.env.PORT, process.env.IP);
