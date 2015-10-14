/**
 * Created by daniele on 10/10/15.
 */
/*
 * Basic CRUD operations driver for PostgreSQL.
 *
 *
 * @author: Daniele Gazzelloni <daniele@danielegazzelloni.com>
 ********************************************************************/


var pg      = require("pg");

var config  = require("./config");
var logger  = require("./logger");


// Connection string
var conString = "postgres://"+config.pgUser+":"+config.pgPass+"@"+config.pgHost+"/"+config.pgDatabase;



/**
 * Check if table "users" exists: if not, creates it.
 *
 * @param:    sql query (CREATE TABLE IF NOT EXISTS...etc...)
 *
 * @return:   none.
 */
exports.init = function(sqlQuery) {

  // This initializes a connection pool:
  // It will keep idle connections open for a (configurable) 30 seconds
  // and set a limit of 20 (also configurable)
  pg.connect(conString, function(error, client, done) {

    if (error) {
      logger.log("*", "pg-sql - error fetching client from pool: " + error);
      return;
    }

    // Initialize our DB if tables are empty
    client.query(sqlQuery, function(error, result) {

      // Call "done()" to release the client back to the pool
      done();

      if (error) {
        logger.log("*", "pg-sql: error creating table 'user': " + error);
      } else {
        logger.log("*", "db initialized.");
      }

    });

  });
};



/**
 * Executes a query to our DB.
 * Very, very simple syntax.
 *
 * @param:    an SQL query string
 *
 * @return:   error: boolean
 *            result: array[], the query result
 */
exports.query = function (queryString, callback) {

  // This initializes a connection pool:
  // It will keep idle connections open for a (configurable) 30 seconds
  // and set a limit of 20 (also configurable)
  pg.connect(conString, function(error, client, done) {

    if (error) {
      logger.log("*", "pg-sql: error fetching client from pool:" + error);
      return callback(error, null);
    }

    client.query(queryString, function(error, result) {

      // Call "done()" to release the client back to the pool
      done();

      if (error) {
        logger.log("*", "pg-sql: error running query: " + error);
        callback(error, null);
      } else {
        callback(error, result.rows);
      }

    });

  });

};