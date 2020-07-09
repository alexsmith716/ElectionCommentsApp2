


var mongoose = require('mongoose');
var options = {server: {socketOptions: {keepAlive: 1}}};
var dbURI = 'mongodb://localhost/ElectionCommentsApp';

var _db;

module.exports = {

  connectToServer: function( callback ) {
    mongoose.connect( dbURI ,options,  function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};

/*
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to: ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose has disconnected');
});

handleProcessTermination = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
*/

/*

// To use it, you would do this in your app.js:

var mongoUtil = require( 'mongoUtil' );
mongoUtil.connectToServer( function( err ) {
  // start the rest of your app here
} );

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// And then, when you need access to mongo somewhere, you can do this:

var mongoUtil = require( 'mongoUtil' );
var db = mongoUtil.getDb();
db.collection( 'users' ).find();

*/