// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Faves
  // GET route for getting all of the todos
  app.get("/api/faves", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Fave.findAll({}).then(function(dbFave) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbFave);
    });
  });



  // Fave route for saving a new Fave
  app.post("/api/faves", function(req, res) {
    db.Fave.create(req.body).then(function(dbFave) {
      res.json(dbFave);
    });
  });

  // DELETE route for deleting Faves
  // app.delete("/api/faves/:id", function(req, res) {
  //   db.Fave.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbFave) {
  //     res.json(dbFave);
  //   });
  // });
};
