module.exports = function(sequelize, DataTypes) {
  	var requestTable = sequelize.define("PrayerRequest", {
	    request: DataTypes.STRING,
	  	timestamp: DataTypes.DATE,
	  	hearts: DataTypes.INTEGER
	  });

  	return requestTable;
	// request.create({request: "This is a test", timestamp: new Date()}).then(prayerRequest => {
 //  		// you can now access the newly created task via the variable task
 //  		console.log(prayerRequest.get({
 //  			plain: true
 //  		}));
	// });
}