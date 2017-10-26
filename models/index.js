var gameTable;
var profileTable;
var optionsTable;

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  // if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize("postgres://ffcyxdfbfjvozq:9c3b3d81847eaadfe16e032c94e95549d0ae18b9c5deb4357dd9bf2e4f79e1ee@ec2-174-129-33-159.compute-1.amazonaws.com:5432/db857ppgm0935d", {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     5432,
      host:     "ec2-174-129-33-159.compute-1.amazonaws.com",
      logging:  true,

      dialectOptions: {
        ssl: true
      }
    });
  // } else {
  //   // the application is executed on the local machine ... use mysql
  //   sequelize = new Sequelize('example-app-db', 'root', process.env.DB_PASSWORD, {
  //     dialect: 'mysql'
  //   });
  // }

  gameTable = sequelize.import(__dirname + '/game');
  profileTable = sequelize.import(__dirname + '/profile');
  optionsTable = sequelize.import(__dirname + '/options');

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    GameTable: gameTable,
  }
}

module.exports = global.db