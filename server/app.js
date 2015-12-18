var express = require('express')

var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var dbUrl = "mongodb://localhost/app";
mongoose.connect(dbUrl);

app.use(session({
  secret: "secret code",
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 4*7*24*60*60*1000}
}));

app.use(express.static('public'));

var server = app.listen(4000, function () {
  var port = server.address().port;
  console.log('Now server is running on %s port...', port);
})
