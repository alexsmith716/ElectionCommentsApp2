
var express 		= require('express');
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var parseurl 		= require('parseurl');
var session 		= require('express-session');
var MongoStore 		= require('connect-mongo')(session);
var mongoose 		= require('mongoose');
var parseurl 		= require('parseurl')
var path 			= require('path');
var handleProcessTermination;

var uri 			= 'mongodb://localhost/ElectionCommentsApp';
global.db 			= mongoose.createConnection(uri);

var app 			= express();
module.exports 		= app;

app.set('views', path.join(__dirname, 'theServer', 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.locals.foosbarr = 'FoosBarr!';

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('listening on http://localhost:3000: ', server.address().port);
});

db.on('error', function(err) {
    console.log('Mongoose connection error: ', err);
});

db.on('connected', function() {
    console.log('Mongoose connection connected!');
});

db.once('open', function () {
  console.log('Database connection opened!');
});

db.on('disconnected', function() {
    console.log('Mongoose connection disconnected!');
});

handleProcessTermination = function(msg, callback) {
    db.onClose(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function() {
    handleProcessTermination('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function() {
    handleProcessTermination('app termination', function() {
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    handleProcessTermination('Heroku app termination', function() {
        process.exit(0);
    });
});

/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */

app.use(session({
	secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({ mongooseConnection: db })
}));

app.use('/', function (req, res, next) {
	var views = req.session.views
  	if (!views) {
    	views = req.session.views = {}
  	}
  	var pathname = parseurl(req).pathname
  	views[pathname] = (views[pathname] || 0) + 1
  	console.log('VIEWED SESSION TIMES!!! ', req.method, " :: ", req.url, " :: ", req.session.views[pathname], ' times')
  	next()
});

/*
app.use(express.session({
    secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new mongoStore({
        mongooseConnection: db,
        touchAfter: 24 * 3600 // time period in seconds
    })
}));
*/

app.use(function (req, res, next) {
	//console.log("Middleware !!!: [", req.method, "]", req.url)
	next() 
});

app.use(function (req, res, next) {
	//console.log("Middleware !!!: [", req.method, "]", req.url)
	next() 
});

app.use('/:commentid', function (req, res, next) {
  console.log('XXXXXXXXX3XXXXRequest Type:', req.method);
  next();
});

var serverRoutes = require('./theServer/routes/serverRoutes');
var apiRoutes = require('./theAPI/routes/apiRoutes');
app.use('/api', apiRoutes);

/*
app.use(session({
    secret: 'keyboard cat',
    store: new mongoStore({
        url: 'mongodb://localhost/mongostore1',
        autoRemove: 'native'
    })
}));

app.use('/', function (req, res, next) {
	var views = req.session.views
  	if (!views) {
    	views = req.session.views = {}
  	}
  	var pathname = parseurl(req).pathname
  	views[pathname] = (views[pathname] || 0) + 1
  	console.log('VIEWED SESSION TIMES!!! ', req.method, " :: ", req.url, " :: ", req.session.views[pathname], ' times')
  	next()
});

// http://127.0.0.1:3000/
app.use(session({
	secret: 'keyboard cat',
    store: new mongoStore({
        url: 'mongodb://localhost/mongostore1',
        autoRemove: 'native'
    })
      store: new mongoStore({ mongooseConnection: mongoose.connection, collection: 'session',
      })
}));
*/




// cd documents/oldss/electioncommentsapp2
/*

	app.locals: Application local variables are provided to all templates rendered within the application. 
	This is useful for providing helper functions to templates, as well as app-level data.
	express middleware jade
	Express is a routing and middleware web framework that has minimal functionality of its own: 
	An Express application is essentially a series of middleware function calls.

	When a request comes in to the application it passes through each piece of middleware in turn. 
	Each piece of middleware may or may not do something with the request.
	A core part of Node is that basically all modules export an object which can easily be called elsewhere in the code.
	A middleware function always has the following signature: function(request, response, next)
*/
/*
	(review coffee place button that launches individual coffee place page from index page)
	a(href="/location/#{location._id}")= location.name

++++++++++++++++++++++++++++++++++++++++

	form.form-horizontal(action="", method="post", role="form")
	button.btn.btn-default.pull-right Add my review NOW!

++++++++++++++++++++++++++++++++++++++++

	(add review button on coffee place page that launches above page which is the actual form.)
	a.btn.btn-default.pull-right(href="/location/#{location._id}/review/new") Add review man!

++++++++++++++++++++++++++++++++++++++++

However, more typically these type of RESTful API endpoints are called from browsers with javascript as AJAX requests, 
which can use all of the available HTTP methods. 

This can be done with the XmlHttpRequest standard API, jQuery's $.ajax, or the front end framework of your choosing.

Routes bind a URL to a specific function. 
In other words, when a request is sent by the end user, it’s handled by a specific URL. 
Different requests are handled by different URLs within our application. 
Hence the need for different routes.
*/
/*
	a.btn.btn-warning.btn-md(href='/comment/#{commentid}') Delete
	For goodness sake, it's nodejs. Don't use an XMLHttpRequest emulator. 
	Why emulate a bad browser interface in node.js. 
	Use the http or the request module. 
	I'd personally use the request module.

	While jQuery does offer many Ajax-related convenience methods, the core $.ajax method is at the heart of all of them
    form delete method action
    AJAX delete request
    express ajax delete

            .pull-right
              button(class="btn btn-default btn-md", onclick="window.location.href='/#{commentid}'") Edit
              | &nbsp;&nbsp;&nbsp;&nbsp;
              a.btn.btn-primary.btn-md(href='/#{commentid}') Delete

            .pull-right
              button(class="btn btn-default btn-md adjustIndexEditDeleteBtns", onclick="window.location.href='/#{theID}'") Edit
              | &nbsp;&nbsp;&nbsp;&nbsp;
              button(class="btn btn-warning btn-md adjustIndexEditDeleteBtns", onclick="method='delete';window.location.href='/#{theID}'") Delete

            .pull-right
              form(name="edit", method="get", action="/#{theID}")
                button(class="btn btn-default btn-md", type="submit") Edit
              | &nbsp;&nbsp;&nbsp;&nbsp;
              form(name="delete", method="delete", action="/delete/#{theID}")
                button(class="btn btn-warning btn-md", type="submit") Delete

            .pull-right
              form(id="edit", method="get", action="/#{theID}")
                button(class="btn btn-default btn-md", type="submit") Edit
              | &nbsp;&nbsp;&nbsp;&nbsp;
              form(id="delete", method="delete", action="/#{theID}")
                input(type='hidden', name='_method', value='PUT')
                button(class="btn btn-warning btn-md", type="submit") Delete
*/
/*
// Create a session:
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  store: new MongoStore({
  	mongooseConnection: mongoose.connection
  }),
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.use(session({
  secret: 'ziKologiia',
  clear_interval: 900,
  cookie: { maxAge: 2 * 60 * 60 * 1000 },
  store: new MongoStore({
    db: mongoose.connection.db
  });
}));
*/

