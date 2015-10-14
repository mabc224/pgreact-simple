
/*
 * Routing.
 *
 * Just pass express() through a variable to serveRoutes().
 *
 *
 * @author: Daniele Gazzelloni <daniele@danielegazzelloni.com>
 ********************************************************************/



// BASE SETUP
// ==============================================

var express       = require('express');
var bodyParser    = require('body-parser');
var fs            = require('fs');

var config        = require('./config');
var logger        = require('./logger');

var users         = require('./users');




// Restrict Access-Control directives as our needs
var allowCrossDomain = function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

};



// Serving routes
exports.serveRoutes = function (app) {

  app.use(allowCrossDomain);

  // limit received data to 5mb
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));

  // Serve "public" directory as static
  app.use('/', express.static(__dirname+"/../../frontend/build/"));



  // ROUTES
  // ==============================================

  // Send back README.md
  app.get('/readme', function (req, res) {

    fs.readFile(__dirname+'/../../README.md', 'utf8', function (err, data) {
      res.send(data);
    });

  });

  app.get('/api/:api', function (req, res) {


    // Call the appropriate GET (read) function basing on requested API:
    switch (req.params.api) {

      // Return users.
      // See users.js for more info.
      case "users":

        logger.log(">", "GET users service called.");

        users.get(req, function (error, result) {
            res.json({ error: error, result: result });
        });

        break;

      // 404 error: no API defined.
      default:
        res.status(404).json({ error: true, message: "Cannot access to /api/"+req.params.api });
        break;

    }

  });


  app.put('/api/:api', function (req, res) {

    // Call the appropriate PUT (edit) function basing on requested API:
    switch (req.params.api) {

      // Edit a single user.
      // See users.js for more info.
      case "users":

        logger.log(">", "PUT users service called.");

        users.edit(req, function (error, result) {
          res.json({ error: error, result: result });
        });

        break;

      // 404 error: no API defined.
      default:
        res.status(404).json({ error: true, message: "Cannot access to /api/"+req.params.api });
        break;

    }

  });


  app.delete('/api/:api', function (req, res) {

    // Call the appropriate DELETE (remove) function basing on requested API:
    switch (req.params.api) {

      // Delete a single user
      // See users.js for more info.
      case "users":

        logger.log(">", "DELETE users service called.");

        users.delete(req, function (error, result) {
          res.json({ error: error, result: result });
        });

        break;

      // 404 error: no API defined.
      default:
        res.status(404).json({ error: true, message: "Cannot access to /api/"+req.params.api });
        break;

    }

  });


  app.post('/api/:api', function (req, res) {

    // Call the appropriate POST (create/insert) function basing on requested API:
    switch (req.params.api) {

      // Insert (create) a new user.
      // See users.js for more info.
      case "users":

        logger.log(">", "POST users service called.");

        users.insert(req, function (error, result) {
          res.json({ error: error, result: result });
        });

        break;

      // 404 error: no API defined.
      default:
        res.status(404).json({ error: true, message: "Cannot access to /api/"+req.params.api });
        break;

    }

  });

};

