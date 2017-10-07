module.exports = function(sequelize, DataTypes) {
  var Fave = sequelize.define("Fave", {
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    distance: DataTypes.STRING,
    rating: DataTypes.STRING,
    phone: DataTypes.STRING,
    price: DataTypes.STRING
    });
    // img: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    //   len: [1]
    // }

  Fave.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Fave.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Fave;
};
