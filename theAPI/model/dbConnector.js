
var mongoose = require('mongoose');

var MainCommentSchema = new mongoose.Schema({
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

module.exports.ElectionCommentsAppModel = db.model('ElectionCommentsAppModel', MainCommentSchema, 'mainCommentCollection');