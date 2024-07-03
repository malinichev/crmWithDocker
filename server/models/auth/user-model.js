const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const UserSchema = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ["USER"] },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

module.exports = UserSchema;
