// Creates users table in SQL with fave association//

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Users.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Users.hasMany(models.Fave, {
      onDelete: "cascade"
    });
  };

  return Users;
};
