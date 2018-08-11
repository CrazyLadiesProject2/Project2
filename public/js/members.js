//once user logs in successfully, it will request their user date from the DB users table

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".ProfileName").text("Welcome " + data.username);
    
  });
});
