// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env        = require('dotenv').load();


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Static directory
app.use(express.static(__dirname + '/public'));

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Causing issues with localization

app.use(session({ secret: 'tender food',resave: true, saveUninitialized:true})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions


//load &routes to passport strategies
require('./routes/auth.js')(app,passport);
require('./config/passport/passport.js')(passport,db.user);

// Routes
// =============================================================
require("./routes/fave-api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
