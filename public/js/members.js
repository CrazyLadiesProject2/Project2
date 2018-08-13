//once user logs in successfully, it will request their user date from the DB users table

$(document).ready(function () {
  var author;
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".ProfileName").text("Welcome " + data.username);
    author = data.username;
    
  });
  
  
  //some text here to add a post
  var postForm = $("form.post");
  var postTextBox = $("textarea.textBox");
  console.log(author);

  postForm.on("submit", function (event) {
    event.preventDefault();
    var postData = {
      post: postTextBox.val().trim(),
      postAuthor: author
    };

    //envoke the function to post the confession 
    //only if the user has entered something in the text box
    if (postTextBox.val() === "") {
      return;
    } else {
      postConfession(postData.post, postData.postAuthor);
    }
 
  });




  function postConfession(post, postAuthor) {
    console.log("on member.js, going to post to api");
    $.post("/api/postConfession", {
      post: post,
      author: postAuthor
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    });
  }

});
