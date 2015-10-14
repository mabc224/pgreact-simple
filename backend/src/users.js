/*
 * Users are defined here.
 * In particular, an user is defined as following:
 *
 * user: {
 *  name:   <string>,
 *  age:    <int>,
 *  email:  <string>
 * }
 *
 * Very, very simple.
 *
 *
 * @author: Daniele Gazzelloni <daniele@danielegazzelloni.com>
 ********************************************************************/



var db      = require("./db_postgres");
var config  = require("./config");





// Initialize our "users" table
db.init(
  "CREATE TABLE IF NOT EXISTS users (" +
  "id serial NOT NULL PRIMARY KEY," +
  "name VARCHAR(40) NOT NULL," +
  "age INT NOT NULL," +
  "email VARCHAR(40) DEFAULT ''" +
  ")"
);





/**
 * We expect an id as query parameter, eg. "http://<hostname>/users?id=12345".
 * If no id is provided, an array of users is returned.
 *
 * @param:    id: <int>
 *
 * @return:   error: boolean
 *            user: { name: string, age: int, email: string }
 *
 *            error: boolean
 *            users: [{ name: string, age: int, email: string }]
 */
exports.get = function (req, callback) {

  var sqlQuery = "";

  if (req.query.id == undefined || typeof parseInt(req.query.id) != "number") {
    sqlQuery = 'SELECT * FROM users';
  } else {
    sqlQuery = "SELECT * FROM users WHERe ID="+parseInt(req.query.id);
  }

  db.query(sqlQuery, function (error, results) {
    var result;

    if (req.query.id == undefined || typeof parseInt(req.query.id) != "number") {
      result = results;
    } else {
      result = results[0];
    }

    callback((error === null ? false : error ), result);

  });

};



/**
 * We expect an id as parameter, as well as ALL the other parameters like
 * user's name, email and age. This method will update the db entry identified
 * with the "id" parameter.
 *
 * @return:    error: boolean
 */
exports.edit = function (req, callback) {

  var sqlQuery = "";

  // If missing or incorrect parameters return an error
  if (req.body.id == undefined || typeof parseInt(req.body.id) != "number" ||
    req.body.name == undefined || typeof req.body.name != "string" ||
    req.body.age == undefined || typeof parseInt(req.body.age) != "number") {

    callback(true);

  } else {

    sqlQuery = "UPDATE users SET " +
      "name = '" + req.body.name + "', " +
      "age = " + parseInt(req.body.age) + ", " +
      "email = '" + (req.body.email ? req.body.email : "") + "' " +
      "WHERE id = " + parseInt(req.body.id);

    db.query(sqlQuery, function (error, results) {

      callback( (error === null ? false : error ) );

    });

  }

};



/**
 * We expect an id as parameter. This method will delete the db entry identified
 * with the "id" parameter.
 *
 * @return:    error: boolean
 */
exports.delete = function (req, callback) {

  var sqlQuery = "";

  // if no id provided, return an error!
  if (req.body.id == undefined || typeof parseInt(req.body.id) != "number") {

    callback(true);

  } else {

    sqlQuery = "DELETE FROM users WHERE ID=" + parseInt(req.body.id);

    db.query(sqlQuery, function (error, results) {

      callback( (error === null ? false : error ) );

    });

  }

};



/**
 * We expect all the user parameters like name, email and age.
 * This method will insert a new record into the database returning.
 *
 * @return:    error: boolean
 */
exports.insert = function (req, callback) {

  var sqlQuery = "";

  // If missing or incorrect parameters return an error
  if (req.body.name == undefined || typeof req.body.name != "string" || req.body.name.length <1 ||
    req.body.age == undefined || typeof parseInt(req.body.age) != "number" || req.body.age.length <1) {

    callback(true);

  } else {

    if (req.body.id != undefined && req.body.id != null) {
      sqlQuery = "INSERT INTO users (id, name, age, email) VALUES (" +
        parseInt(req.body.id)+", " +
      "'" + req.body.name + "', " +
      parseInt(req.body.age) + ", " +
      "'"+ (req.body.email ? req.body.email : '') + "'" +
      ")";
    } else {
      sqlQuery = "INSERT INTO users (name, age, email) VALUES (" +
      "'" + req.body.name + "', " +
      parseInt(req.body.age) + ", " +
      "'"+ (req.body.email ? req.body.email : '') + "'" +
      ")";
    }

    db.query(sqlQuery, function (error, results) {

      callback( (error === null ? false : error ) );

    });

  }

};