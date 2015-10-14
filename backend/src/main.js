/*
 * Main backend app file: everything starts here.
 *
 *
 * @author: Daniele Gazzelloni <daniele@danielegazzelloni.com>
 ********************************************************************/



// BASE SETUP
// ==============================================

var express = require('express');
var config  = require('./config');
var logger  = require('./logger');
var routing = require('./routing');

var app     = express();
var port    = process.env.PORT || config.serverPort;



// Serving routes...
routing.serveRoutes(app);



// STARTING BACKEND SERVER...
// ==============================================

app.listen(port, function () {

  logger.log("*", "listening on port "+this.address().port+".");

});
