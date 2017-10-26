var gameTable;

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  // if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    // sequelize = new Sequelize("postgres://rdojbrmjsgnbyg:9370d9ba61efff4b6be7f5fd46fe2391a55de46059e28c29d5003a7e161aeacc@ec2-184-73-247-240.compute-1.amazonaws.com:5432/dc5p5rqe91nvmf", {
    //   dialect:  'postgres',
    //   protocol: 'postgres',
    //   port:     5432,
    //   host:     "ec2-184-73-247-240.compute-1.amazonaws.com",
    //   logging:  true,

    //   dialectOptions: {
    //     ssl: true
    //   }
    // });
  // } else {
  //   // the application is executed on the local machine ... use mysql
  //   sequelize = new Sequelize('example-app-db', 'root', process.env.DB_PASSWORD, {
  //     dialect: 'mysql'
  //   });
  // }

  // gameTable = sequelize.import(__dirname + '/game');

  // global.db = {
  //   Sequelize: Sequelize,
  //   sequelize: sequelize,
  //   Game: gameTable
  // }
}

module.exports = global.db