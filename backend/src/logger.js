/*
 * Logger module.
 *
 * Use it as:
 *    logger.log('log mark', "log message");
 *
 *
 * @author: Daniele Gazzelloni <daniele@danielegazzelloni.com>
 ********************************************************************/



var config = require('./config');


// Log out to the main console with a specific format
exports.log = function (type, message) {

  if (type.length>1) {
    process.stdout.write("[#{currentTime()}] #{type.substr(0, 1)} #{config.appName}: #{message}");
  } else {
    console.log("[%s] %s %s: %s", currentTime(), type, config.appName, message);
  }

};

// Formats current time to: 'hh24:mi:ss'
var currentTime = function () {
  var date  = new Date();
  var h     = date.getHours();
  var mi    = date.getMinutes();
  var s     = date.getSeconds();

  // It's a pleasure to read this, I know...
  return (h>9 ? h : "0"+h) +":"+ (mi>9 ? mi : "0"+mi) +":"+ (s>9 ? s : "0"+s);
};

