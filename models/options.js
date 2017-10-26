module.exports = function(sequelize, DataTypes) {
  	var optionsTable = sequelize.define("Options", {
	    option_id: DataTypes.STRING,
	  	num_of_votes: DataTypes.STRING,
	  	img_url: DataTypes.STRING,
	  	description: DataTypes.STRING
	  });

  	return optionsTable;
}