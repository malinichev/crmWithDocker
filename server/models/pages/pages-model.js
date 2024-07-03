const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const PagesSchema = sequelize.define("pages-data", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
  json: { type: DataTypes.JSON, allowNull: true },
});

module.exports = PagesSchema;
