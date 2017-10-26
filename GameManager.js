var GAME_DURATION_MILLIS = 30000;
var MAX_NUM_OF_GAMES = 2
var game_id = 0;
var game_expiration = 0;
var loop = false;

var GameManager = function() {
	
}

function sendGame1(res, game) {
	console.log("send game 1");
	res.send({
		result : {
				game_id: game.game_id, 
				expiration: game.expiration, 
				type: game.type, 
				profile: [{
					profile_id: "1",
					img_url: "https://images.unsplash.com/photo-1496361060943-f0ae4e7228f4?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
					description: "This is a bagel", 
					video_url: ""
				}],
				options: [
					{
						option_id: "1",
						num_of_votes: game.option_1,
						img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
						description: "option 1"
					},
					{
						option_id: "2",
						num_of_votes: game.option_2,
						img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
						description: "option 2"
					},
					{
						option_id: "3",
						num_of_votes: game.option_3,
						img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
						description: "option 3"
					}
				]
			}
		});
}

function sendGame2(res, game) {
	console.log("send game 2");
	res.send({
		result : {
				game_id: game.game_id, 
				expiration: game.expiration, 
				type: game.type, 
				profile: [{
					profile_id: "2",
					img_url: "https://images.unsplash.com/photo-1496361060943-f0ae4e7228f4?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
					description: "This is a bagel", 
					video_url: ""
				}, 
				{
					profile_id: "3",
					img_url: "https://images.unsplash.com/photo-1496361060943-f0ae4e7228f4?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
					description: "This is a bagel", 
					video_url: ""
				}],
				options: [
					{
						option_id: "1",
						num_of_votes: game.option_1,
						img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
						description: "option 1"
					},
					{
						option_id: "2",
						num_of_votes: game.option_2,
						img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
						description: "option 2"
					},
					{
						option_id: "3",
						num_of_votes: game.option_3,
						img_url: "https://images.unsplash.com/photo-1492476801580-00fb76d294d3?w=668&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
						description: "option 3"
					}
				]
			}
		});
}

function sendExistingTable(gameId, callback) {
	db.GameTable.find({
				where : { 
					game_id : String(gameId)
				}
			}).then(game => {
				console.log("***" + gameId);
				callback(game);
			});
}

function initializeGame(res, db) {
	var currentDate = new Date();
	var currentTimeMillis = currentDate.getTime();

	console.log("Expiration " + game_expiration);
	console.log("Current Millis " + currentTimeMillis);
	console.log(game_id);

	if (currentTimeMillis >= game_expiration) {
		game_id += 1
		var gameId = String(game_id);
		var date = new Date();
		var millis = date.getTime();
		game_expiration = millis + GAME_DURATION_MILLIS;

		db.GameTable.create({
			game_id: gameId, 
			expiration: String(game_expiration), 
			type: "matchmaker", 
			option_1: "0", 
		  	option_2: "0",
		  	option_3: "0"
		}).then(game => {
			if (game_id % MAX_NUM_OF_GAMES == 0) { 
				sendGame1(res, game);
			} else if (game_id % MAX_NUM_OF_GAMES == 1) {
				sendGame2(res, game);
			}
		});
	} else {
		sendExistingTable(game_id, function(game) {
			if (game_id % MAX_NUM_OF_GAMES == 0) { 
				sendGame1(res, game);
			} else if (game_id % MAX_NUM_OF_GAMES == 1) {
				sendGame2(res, game);
			}
		});
	}
}

function vote(res, db, gameId, option) {
	db.GameTable.find({
				where : { 
					game_id : String(gameId)
				}
			}).then(game => {
				if (!game) {
					res.send({
						status : "success"
					});
				}
				
				if (option == 1) {
					game.increment('option_1', {by: 1}).then(() => {
						res.send({
							status : "success"
						});
					});
				} else if (option == 2) {
					game.increment('option_2', {by: 1}).then(() => {
						res.send({
							status : "success"
						});
					});
				} else if (option == 3) {
					game.increment('option_3', {by: 1}).then(() => {
						res.send({
							status : "success"
						});
					});
				}
			});
}

GameManager.prototype.getGame = function(req, res, db) { 
	initializeGame(res, db);
}

GameManager.prototype.vote = function(req, res, db) { 
	if (req.body.game_id && req.body.option) {
		vote(res, db, req.body.game_id, req.body.option);
	} else {
		res.send({
			status : "success"
		});
	}
}

module.exports = new GameManager();