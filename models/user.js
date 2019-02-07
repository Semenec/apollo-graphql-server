const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        field: "email",
        type: DataTypes.STRING,
        unique: {
          name: "email",
          msg: "Email is already registered."
        },
        validate: {
          isEmail: true
        }
      },
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };

  User.beforeCreate(user => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  return User;
};
