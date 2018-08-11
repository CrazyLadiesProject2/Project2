
// Creating our posts model
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("posts", {
    // the username cannot be null and must be unique
    post: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    // The password cannot be null
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Posts;
};