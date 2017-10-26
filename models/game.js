module.exports = function(sequelize, DataTypes) {
  	var gameTable = sequelize.define("Game", {
	    game_id: DataTypes.STRING,
	  	expiration: DataTypes.STRING,
	  	type: DataTypes.STRING,
	  	option_1: DataTypes.STRING, 
	  	option_2: DataTypes.STRING,
	  	option_3: DataTypes.STRING
	  });

  	return gameTable;
}