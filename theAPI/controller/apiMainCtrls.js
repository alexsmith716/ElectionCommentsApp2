console.log('####### > apiMainCtrls.js ');

var db = require('../model/dbConnector.js');
var paginate = require('mongoose-range-paginate')
var sortKey = 'time'
var sort = '-' + sortKey
var sortDocsFrom = 0;

//console.log('####### > apiMainCtrls.js > DDDDDDDBBBBBB module.exports:', db);

//var mongoose = require('mongoose');
//var MongooseModel = mongoose.model('ElectionCommentsAppModel');


var sendJSONresponse = function(res, status, content) {
  console.log('####### > apiMainCtrls.js > sendJSONresponse:', status);
  res.status(status);
  res.json(content);
};

var buildGetCommentsResponse = function(req, res, results) {

  var responseBody = [];
  // Will return the time the ObjectId was created
  // ObjectId("505bd76785ebb509fc183733").getTimestamp();
  results.forEach(function(doc) {
    responseBody.push({
      firstName: doc.firstName,
      lastName: doc.lastName,
      city: doc.city,
      state: doc.state,
      candidate: doc.candidate,
      comment: doc.comment,
      time: doc.time,
      _id: doc._id
    });
  });
  console.log('####### > apiMainCtrls.js > buildGetCommentsResponse > return responseBody');
  return responseBody;
};

// mongoose model count
//mongoose-auto-increment plugin
//Model.count({}, function(err, count){ console.log( "Number of docs: ", count );});

function getQuery() {
  return db.ElectionCommentsAppModel.find()
    .where({})
}

module.exports.getAllCommentsResponse = function(req, res) {
  console.log('####### > apiMainCtrls.js > getAllCommentsResponse 1 ');
  //db.ElectionCommentsAppModel.find({}, function (err, results) {
  //var q = db.ElectionCommentsAppModel.find({}).sort({_id: -1}).limit(5);
  //q.exec(function(err, results) {
  var count = db.ElectionCommentsAppModel.count({});
  paginate(getQuery(), { sort: sort, limit: 5 }).exec(function (err, results) {
    var responseBody;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      // get next 5 docs ready
      //paginate(getQuery(), {sort: sort,startId: docs[4]._id,startKey: docs[4][sortKey],limit: 5});
      // first 5 docs ready
      sortDocsFrom = 4;
      console.log('####### > apiMainCtrls.js > getAllCommentsResponse 2 ');
      responseBody = buildGetCommentsResponse(req, res, results);
      console.log('####### > apiMainCtrls.js > getAllCommentsResponse 3 ');
      sendJSONresponse(res, 200, responseBody);
    }
  })
};


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module.exports.postOneCommentResponse = function(req, res) {
  //console.log('####### > apiMainCtrls.js > electioncommentsCreate 1 ');
  db.ElectionCommentsAppModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    state: req.body.state,
    candidate: req.body.candidate,
    comment: req.body.comment,
    time: req.body.time,
  }, function(err, electioncomment) {
    if (err) {
      //console.log('####### > apiMainCtrls.js > electioncommentsCreate 2 > Err: ', err);
      //console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      //console.log('####### > apiMainCtrls.js > electioncommentsCreate 3 > Good: ', electioncomment);
      sendJSONresponse(res, 201, electioncomment);
    }
  });
};


/* GET a location by the id */
module.exports.getOneCommentResponse = function(req, res) {
  console.log('####### > apiMainCtrls.js > getOneCommentResponse: ', req.params);
  if (req.params && req.params.commentid) {
    db.ElectionCommentsAppModel.findById(req.params.commentid).exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "commentid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
        sendJSONresponse(res, 200, results);
      });
  } else {
    console.log('No commentid specified');
    sendJSONresponse(res, 404, {
      "message": "No commentid in request"
    });
  }
};


/* PUT /api/comments/:commentid */
module.exports.editOneComment = function(req, res) {
  if (!req.params.commentid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, commentid is required"
    });
    return;
  }
  db.ElectionCommentsAppModel.findById(req.params.locationid).select('-reviews -rating').exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "commentid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        location.name = req.body.name;
        location.address = req.body.address;
        location.facilities = req.body.facilities.split(",");
        location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openingTimes = [{
          days: req.body.days1,
          opening: req.body.opening1,
          closing: req.body.closing1,
          closed: req.body.closed1,
        }, {
          days: req.body.days2,
          opening: req.body.opening2,
          closing: req.body.closing2,
          closed: req.body.closed2,
        }];
        location.save(function(err, location) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, location);
          }
        });
      }
  );
};

module.exports.deleteOneComment = function(req, res) {
  var commentsid = req.params.commentsid;
  if (!commentsid) {
    sendJsonResponse(res, 404, {
    "message": "Not found, locationid and reviewid are both required"
  });
    return; 
  }
  
  if (commentsid) {
    db.ElectionCommentsAppModel.findByIdAndRemove(commentsid).exec(function(err, comment) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Comment id " + commentsid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, { "message": "No commentid in request" });
  }
};


