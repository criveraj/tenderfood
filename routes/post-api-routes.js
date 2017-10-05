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
  app.get("/api/Faves", function(req, res) {
    var query = {};
    if (req.query.User_id) {
      query.UserId = req.query.User_id;
    }
    db.Fave.findAll({
      where: query
    }).then(function(dbFave) {
      res.json(dbFave);
    });
  });

  // Get rotue for retrieving a single Fave
  app.get("/api/Faves/:id", function(req, res) {
    db.Fave.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbFave) {
      console.log(dbFave);
      res.json(dbFave);
    });
  });

  // Fave route for saving a new Fave
  app.Fave("/api/Faves", function(req, res) {
    db.Fave.create(req.body).then(function(dbFave) {
      res.json(dbFave);
    });
  });

  // DELETE route for deleting Faves
  app.delete("/api/Faves/:id", function(req, res) {
    db.Fave.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFave) {
      res.json(dbFave);
    });
  });

  // PUT route for updating Faves
  app.put("/api/Faves", function(req, res) {
    db.Fave.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbFave) {
        res.json(dbFave);
      });
  });
};
