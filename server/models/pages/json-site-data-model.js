const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const JsonSiteDataSchema = sequelize.define("json-site-data", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  siteData: { type: DataTypes.JSON, allowNull: true },
});

module.exports = JsonSiteDataSchema;
