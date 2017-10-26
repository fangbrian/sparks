module.exports = function(sequelize, DataTypes) {
  	var gameTable = sequelize.define("Game", {
	    game_id: DataTypes.STRING,
	  	expiration: DataTypes.STRING,
	  	type: DataTypes.STRING,
	  	option_1: DataTypes.INTEGER, 
	  	option_2: DataTypes.INTEGER,
	  	option_3: DataTypes.INTEGER
	  });

  	return gameTable;
}