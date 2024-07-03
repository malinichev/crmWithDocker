const UserSchema = require("./auth/user-model");
const TokenSchema = require("./auth/token-model");
const JsonSettingsSchema = require("./auth/json-settings-model");
const JsonSiteDataSchema = require("./pages/json-site-data-model");
const PagesSchema = require("./pages/pages-model");
const User = require("./auth/user-model");

User.hasOne(TokenSchema);
TokenSchema.belongsTo(User);

User.hasOne(JsonSettingsSchema);
JsonSettingsSchema.belongsTo(User);

module.exports = {
  User: UserSchema,
  Token: TokenSchema,
  JsonSettings: JsonSettingsSchema,
  SiteData: JsonSiteDataSchema,
  Pages: PagesSchema,
};
