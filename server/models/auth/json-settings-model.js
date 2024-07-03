const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const JsonSettingsSchema = sequelize.define("json-settings", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  json: { type: DataTypes.JSON, allowNull: true },
});

module.exports = JsonSettingsSchema;
