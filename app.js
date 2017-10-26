var express = require('express');
var app = express();
var session = require('client-sessions');
var http = require('http');
var locals = require('./locals');
var _url = require('url');
var request = require('request');
var bodyParser = require('body-parser');
var queryString = require('querystring');
var db = require('./models');
var GAME_DURATION_MILLIS = 30000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.get('/game', function(req, res) {
	var date = new Date();
	var millis = date.getTime();
	var expiration = millis + GAME_DURATION_MILLIS;

	res.send({
		game_id: "1", 
		expiration: String(expiration), 
		type: "matchmaker", 
		profile: [{
			profile_id: "1",
			img_url: "https://images.unsplash.com/photo-1496361060943-f0ae4e7228f4?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
			description: "This is a bagel", 
			video_url: ""
		}],
		options: [
			{
				option_id: "1",
				num_of_votes: "0",
				img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
				description: "option 1"
			},
			{
				option_id: "2",
				num_of_votes: "0",
				img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
				description: "option 2"
			},
			{
				option_id: "3",
				num_of_votes: "0",
				img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
				description: "option 3"
			}
		]
	});
});

app.listen(process.env.PORT || 8080);
// db.sequelize.sync().then(function() {
//   	app.listen(process.env.PORT || 8080);
// });