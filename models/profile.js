module.exports = function(sequelize, DataTypes) {
  	var profileTable = sequelize.define("Profile", {
	    profile_id: DataTypes.STRING,
	  	img_url: DataTypes.STRING,
	  	description: DataTypes.STRING,
	  	video_url: DataTypes.STRING
	  });

  	return profileTable;
}