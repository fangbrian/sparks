module.exports = function(sequelize, DataTypes) {
  	var gameTable = sequelize.define("Game", {
	    game_id: DataTypes.STRING,
	  	expiration: DataTypes.STRING,
	  	type: DataTypes.STRING,
	  	profile_1_id: DataTypes.STRING,
	  	profile_2_id: DataTypes.STRING,
	  	option_1_id: DataTypes.STRING,
	  	option_2_id: DataTypes.STRING,
	  	option_3_id: DataTypes.STRING
	  });

  	return gameTable;
}