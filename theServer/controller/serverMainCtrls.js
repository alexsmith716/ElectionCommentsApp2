
var request = require('request');
var db = require('../../theAPI/model/dbConnector.js');
var apiOptions = {
  server : "http://localhost:3000"
};

var handleError = function (req, res, status) {
  var title, content;
	if (status === 404) {
    title = "404: Error";
		content = "The page you requested cannot be found. \n\n For assistance, please contact our Help Desk at 555-555-1234.";
	} else {
    title = status + ": Error";
  	content = "An Error has occurred while browsing. \n\n For assistance, please contact our Help Desk at 555-555-1234.";
  }
  res.status(status);
  res.render('basicView', {
    title : title,
    pageHeader: {
      header: title
    },
    content : content
  });
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */

var renderCallbackIndexData = function(req, res, responseBody){
  console.log('####### > serverMainCtrls.js > renderCallbackData1(responseBody)');
  var responseMessage;
  var dbsCollectionCount;
  if (!(responseBody instanceof Array)) {
    responseMessage = "API path error!";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      responseMessage = "No data found!";
    }
  }
  db.ElectionCommentsAppModel.count({}, function(err, count){ 
    dbsCollectionCount = count;
  });
  console.log('####### > serverMainCtrls.js > renderCallbackData2 > responseBody: ');
  //console.log('####### > serverMainCtrls.js > renderCallbackData2 > responseMessage: ', responseMessage);
  responseBody.sort(function(a, b) {
      //return parseFloat(b.time) - parseFloat(a.time);
  })
  res.render('indexView', {
    title: 'MEANCRUDApp',
    pageHeader: {
      title: 'A Presidential CRUD App'
    },
    sideBlurb: "The 2016 presidential election is upon us! Who do you support and what are your comments regarding this hotly contested event?",
    dbsDocCount: dbsCollectionCount,
    responseBody: responseBody,
    responseMessage: responseMessage
  }, function(err, html) {
        //console.log('####### > serverMainCtrls.js > renderCallbackData3 > html:: ', html);
        res.send(html);
    });
};

module.exports.getAllComments = function(req, res){
  console.log('####### > serverMainCtrls.js > module.exports.indexHomepage 1');
  console.log('SSSSSS 2 SESSION you viewed this page ' + req.session.views + ' times')
  var requestOptions, path;
  path = '/api/comments';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(requestOptions, function(err, response, body) {
    if(err){
      handleError(req, res, response.statusCode);
    }else if (response.statusCode === 200) {
      renderCallbackIndexData(req, res, body);
    }else{
      handleError(req, res, response.statusCode);
    }
  });
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */

module.exports.postOneComment = function(req, res){
  console.log('####### > serverMainCtrls.js > requestAddNewComment > REQFORM!!');
  var requestOptions, path, postdata;
  path = '/api/comments';
  var d = new Date();
  var time = d.getTime();
  postdata = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    state: req.body.state,
    candidate: req.body.candidate,
    comment: req.body.comment,
    time: time
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  //console.log('####### > serverMainCtrls.js > requestAddNewComment > postdata HERE!!!!!>>> ', postdata);
  if (!postdata.firstName || !postdata.lastName || !postdata.city || !postdata.state || !postdata.candidate) {
    //res.redirect('/error view url');
    //console.log('####### > serverMainCtrls.js > requestAddNewComment > data error 1');
  } else {
    request(requestOptions, function(err, httpResponse, body) {
        if (httpResponse.statusCode === 201) {
          res.redirect('/');
        } else if (httpResponse.statusCode === 400 && body.name && body.name === "ValidationError" ) {
            //res.redirect('/error view url');
            //console.log('####### > serverMainCtrls.js > requestAddNewComment > httpResponse error 2');
        } else {
            //console.log(body);
            //_showError(req, res, httpResponse.statusCode);
        }
      }
    );
  }
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */

module.exports.getAddNewComment = function(req, res) {
    console.log('####### > serverMainCtrls.js > getAddNewComment !!!!!!');
    res.render('addNewCommentView', {
    title: 'MEANCRUDApp',
    pageHeader: {
      title: 'Add your comment'
    },
    sideBlurb: "The 2016 presidential election is upon us! Who do you support and what are your comments regarding this hotly contested event?"
    });
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */

var getCommentInfo = function (req, res, callback) {
  console.log('####### > serverMainCtrls.js > getCommentInfo ');
  var requestOptions, path;
  path = "/api/" + req.params.commentid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        handleError(req, res, response.statusCode);
      }
    }
  );
};

var renderDetailPage = function (req, res, responseData) {
  console.log('####### > serverMainCtrls.js > renderDetailPage: ', res.app.locals.foobar);
  res.send('FOOOOOOOOOOO!!!')
  /*
  res.app.render('indexView', function(err, html){
    console.log('####### > serverMainCtrls.js > renderDetailPage > app.render: ', html);
    
    var response = {
      my_html: html
    };
    res.send(response);
  });
  */
  /*
  res.render('indexView', {
    title: 'MEANCRUDApp',
    pageHeader: {
      title: 'A Presidential CRUD App'
    },
    sideBlurb: "The 2016 presidential election is upon us! Who do you support and what are your comments regarding this hotly contested event?",
    responseBody: responseBody,
    responseMessage: responseData
  });
  */
  
};

module.exports.getOneComment = function(req, res){
  console.log('####### > serverMainCtrls.js > getOneComment ');
  getCommentInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};


/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */


// jade partial view
// The Express view system has built-in support for partials and collections, which are “mini” views representing a document fragment
var renderCommentData = function (req, res, responseBody) {
	console.log('####### > serverMainCtrls.js > renderCommentData 1', responseBody._id);
  	res.end();
  	/*
  	res.render('basicView', {
    	title: 'Foooooooo!!',
    	pageHeader: {
    		header: responseBody._id
    	},
    	content: responseBody.comment
  	})
  	*/
};



module.exports.editComment = function(req, res){
  var requestOptions, path;
  path = "/api/comments/" + req.params.commentsid;
  console.log('####### > serverMainCtrls.js > editComment 1', path);

  requestOptions = {
    url : apiOptions.server + path,
    method : "PUT"
  };

  request(requestOptions, function(err, response, body) {
    console.log('####### > serverMainCtrls.js > deleteComment 2');
    if (response.statusCode === 204) {
      res.redirect('/');
    } else {
      handleError(req, res, response.statusCode);
    }
  });
  /*
  fetch('/doPutFind', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          'id': theid
      })
    }).then(function(response) {
      if (response.ok) {
          return response.json()
      }else{
          console.log("############# main2.js > doModalEdit => Bad response")
      }
    }).then(function(data) {

      currentDoc = data;

      var tf = document.getElementById('myFavNoveltiesForm');

      for(var j in currentDoc) {
        var r = currentDoc[j];
        switch (j) {
          case 'firstName': tf.elements[j].value=r; break;
          case 'lastName': tf.elements[j].value=r; break;
          case 'city': tf.elements[j].value=r; break;
          case 'state': $('#state').selectpicker('val', r); break;
          case 'favNovelties': $('#favNovelties').selectpicker('val', r); break;
        }
      }

      $('#updateFormModal').modal({
        keyboard: false,
        backdrop: 'static'
      })

    }).catch(function(error) {
      console.log("############# main2.js > doModalEdit > catch => error: ", error)
  })
  */
};

module.exports.deleteComment = function(req, res){
  console.log('####### > serverMainCtrls.js > deleteComment 1');
  var requestOptions, path;
  path = "/api/comments/" + req.params.commentsid;
  requestOptions = {
  	url : apiOptions.server + path,
  	method : "DELETE"
  };

  request(requestOptions, function(err, response, body) {
  	console.log('####### > serverMainCtrls.js > deleteComment 2');
  	if (response.statusCode === 204) {
      res.redirect('/');
    } else {
  		handleError(req, res, response.statusCode);
		}
	});
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */

module.exports.getAbout = function(req, res) {
  res.render('basicView', {
    title: 'About',
    pageHeader: {
      header: 'About ThisGreatApp!'
    },
    content: 'ThisGreatApp! is all about people sharing their favorite novelties across America.\n\nAut tenetur sit quam aliquid quia dolorum voluptate. Numquam itaque et hic reiciendis. Et eligendi quidem officia maiores. Molestiae ex sed vel architecto nostrum. Debitis culpa omnis perspiciatis vel eum. Vitae doloremque dolor enim aut minus.\n\nPossimus quaerat enim voluptatibus provident. Unde commodi ipsum voluptas ut velit. Explicabo voluptas at alias voluptas commodi. Illum et nihil ut nihil et. Voluptas iusto sed facere maiores.'
  });
};

module.exports.getContact = function(req, res) {
  res.render('basicView', {
    title: 'Contact',
    pageHeader: {
      header: 'Contact ThisGreatApp!'
    },
    content: 'ThisGreatApp! can be contacted by calling 1-800-555-1234.\n\nDolorem necessitatibus aliquam libero magni. Quod quaerat expedita at esse. Omnis tempora optio laborum laudantium culpa pariatur eveniet consequatur.'
  });
};

module.exports.getTeam = function(req, res) {
  res.render('basicView', {
    title: 'Team',
    pageHeader: {
      header: 'Meet the Team'
    },
    content: 'The team behind ThisGreatApp! are a dedicated bunch who enjoy sharing favorite places and experiences.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
  });
};
