var db = require("../models");
var allPosts;
var hbsObject;
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.posts.findAll({}).then(function(data) {
      // console.log(data);
      allPosts = JSON.parse(JSON.stringify(data));
      hbsObject = {
        posts: allPosts
      };
      res.render("index", hbsObject);
      // project will be an instance of Project and stores the content of the table entry
      // with id 123. if such an entry is not defined you will get null
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
  app.get("/profileHome", function (req, res) {
    db.posts.findAll({}).then(function(data) {
      // console.log(data);
       allPosts = JSON.parse(JSON.stringify(data));
       hbsObject = {
        posts: allPosts
      };
      res.render("profileHome", hbsObject);
    });
    
  });
  //here's the login page
  app.get("/login", function (req, res) {
    res.render("login");
  });
  //here's the create (sign up) page
  app.get("/create", function (req, res) {
    res.render("create");
  });

  //uncommenting this makes the login not work!
//   // Render 404 page for any unmatched routes
//   app.get("*", function (req, res) {
//     res.render("404");
//   });
};
