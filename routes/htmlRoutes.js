var db = require("../models");


var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.posts.findAll({}).then(function (data) {
      var hbsObject = {
        posts: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });


  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, function (req, res) {
    res.render("profile");
  });

  //here's the login page
  app.get("/login", function (req, res) {
    res.render("login");
  });


  //uncommenting this makes the login not work!
//   // Render 404 page for any unmatched routes
//   app.get("*", function (req, res) {
//     res.render("404");
//   });
};
