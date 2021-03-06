var express = require('express')

var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
MongoStore = require('connect-mongo')(session);

var dbUrl = "mongodb://localhost/app";
mongoose.connect(dbUrl);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.use(session({
	secret: "secret code",
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 4 * 7 * 24 * 60 * 60 * 1000
	},
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// ___ passport config
require('./config/passport')(passport);

// app routes
require('./routes')(app, passport);

var server = app.listen(5000, function() {
	var port = server.address().port;
	console.log('Now server is running on %s port...', port);
})