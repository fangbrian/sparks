var GAME_DURATION_MILLIS = 30000;
var MAX_NUM_OF_GAMES = 2
var game_id = 0;
var game_expiration = 0;
var loop = false;
var isGameInProgress = false;
var isVotingAllowed = false;

var GameManager = function() {
	
}

function sendGame1(res, game, isComplete) {
	console.log("send game 1");
	res.send({
		result : {
				game_id: game.game_id, 
				expiration: game.expiration, 
				type: game.type, 
				is_complete: isComplete,
				profile: [{
					profile_id: "1",
					img_url: "http://res.cloudinary.com/cmb/image/upload/v1509135096/test_folder/Holly.png",
					description: "This is a bagel", 
					video_url: ""
				}],
				options: [
					{
						option_id: "1",
						num_of_votes: game.option_1,
						img_url: "http://res.cloudinary.com/cmb/image/upload/c_scale,w_500/c_crop,g_center,h_333,w_333/v1509135133/test_folder/Teddy.jpg",
						description: "Woof"
					},
					{
						option_id: "2",
						num_of_votes: game.option_2,
						img_url: "http://res.cloudinary.com/cmb/image/upload/v1509134876/test_folder/alice.jpg",
						description: "Mozzarella and Autumn are my two favorite things!"
					},
					{
						option_id: "3",
						num_of_votes: game.option_3,
						img_url: "http://res.cloudinary.com/cmb/image/upload/v1509134881/test_folder/david_miller.jpg",
						description: "I have an eye roll that would put Liz Lemon to shame!"
					}
				]
			}
		});
}

function sendGame2(res, game, isComplete) {
	console.log("send game 2");
	res.send({
		result : {
				game_id: game.game_id, 
				expiration: game.expiration, 
				type: game.type, 
				is_complete: isComplete,
				profile: [{
					profile_id: "2",
					img_url: "http://res.cloudinary.com/cmb/image/upload/v1509135051/test_folder/lukasz_photo.jpg",
					description: "This is a bagel", 
					video_url: ""
				}],
				options: [
					{
						option_id: "1",
						num_of_votes: game.option_1,
						img_url: "http://res.cloudinary.com/cmb/image/upload/v1509136053/pineapple3_jinryr.jpg",
						description: "I am an excellent dancer and enjoy tropical fruits!"
					},
					{
						option_id: "2",
						num_of_votes: game.option_2,
						img_url: "http://res.cloudinary.com/cmb/image/upload/v1509134898/test_folder/cher.jpg",
						description: "I was really popular before you were born! And my hair is amazing!"
					},
					{
						option_id: "3",
						num_of_votes: game.option_3,
						img_url: "http://res.cloudinary.com/cmb/image/upload/v1509134886/test_folder/melissa.jpg",
						description: " I am an expert eavesdropper and I enjoy Noah's Bagels!"
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

	if (currentTimeMillis >= game_expiration && !isGameInProgress) {
		game_id += 1
		var gameId = String(game_id);
		var date = new Date();
		var millis = Date.now();
		game_expiration = millis + GAME_DURATION_MILLIS;
		console.log(String(game_expiration));

		db.GameTable.create({
			game_id: gameId, 
			expiration: game_expiration, 
			type: "matchmaker", 
			option_1: "0", 
		  	option_2: "0",
		  	option_3: "0"
		}).then(game => {
			isGameInProgress = true;
			isVotingAllowed = true;
			if (game_id % MAX_NUM_OF_GAMES == 0) { 
				sendGame1(res, game, false);
			} else if (game_id % MAX_NUM_OF_GAMES == 1) {
				sendGame2(res, game, false);
			}
		});
	} else if (currentTimeMillis < game_expiration &&isGameInProgress) {
		sendExistingTable(game_id, function(game) {
			if (game_id % MAX_NUM_OF_GAMES == 0) { 
				sendGame1(res, game, false);
			} else if (game_id % MAX_NUM_OF_GAMES == 1) {
				sendGame2(res, game, false);
			}
		});
	} else if (currentTimeMillis >= game_expiration && isGameInProgress) {
		isVotingAllowed = false;
		sendExistingTable(game_id, function(game) {
			if (game_id % MAX_NUM_OF_GAMES == 0) { 
				sendGame1(res, game, true);
			} else if (game_id % MAX_NUM_OF_GAMES == 1) {
				sendGame2(res, game, true);
			}
		});
	}
}

function vote(res, db, gameId, option) {
	if (!isVotingAllowed) {
		return;
	}

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

GameManager.prototype.reset = function(req, res, db) { 
	isGameInProgress = false;
}

GameManager.prototype.initialize = function() { 
	db.GameTable.findAll({
		raw: true
	}).then(games => {
		var max_game_index = 0;
		for (i = 0; i < games.length; i++) {
			if (parseInt(games[i].game_id) > max_game_index) {
				max_game_index = parseInt(games[i].game_id);
			}
		}

		game_id = max_game_index;
		console.log("INIT " + game_id);
	});
}
module.exports = new GameManager();