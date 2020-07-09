
/*
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/ElectionCommentsApp';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to: ' + dbURI);
});
*/

var mongoUtil = require( 'mongooseDbUtil' );

mongoUtil.connectToServer( function( err ) {
  console.log('Mongoose connected to: ' + dbURI);
} );

var mainCommentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    candidate: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    time: {
        type: Number,
        required: true
    }
});

module.exports.ElectionCommentsAppModel = mongoose.model('ElectionCommentsAppModel', mainCommentSchema, 'mainCommentCollection');

