var express  = require('express');
var _ = require("underscore");
var app      = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	res.render('index.jade');
});

http.listen(port);
console.log("App listening on port 8000");
