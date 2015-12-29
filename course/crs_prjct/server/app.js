var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// config app
mongoose.connect("mongodb://localhost:27017/shopp-app");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '123 secret code',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));

require('./routes')(app)

var server = app.listen(4000, function () {
    var port = server.address().port;
    console.log('Now server is running on %s port...', port);
})


