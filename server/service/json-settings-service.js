const { JsonSettings } = require("../models");

class JsonSettingsService {
  async saveJsonSettings(userId, json) {
    const jsonSettingsData = await JsonSettings.findOne({
      where: { userId },
    });

    if (jsonSettingsData) {
      jsonSettingsData.json = json;
      return jsonSettingsData.save();
    }

    const jsonSettings = await JsonSettings.create({
      userId,
      json,
    });

    return jsonSettings;
  }

  async removeToken(userId) {
    const jsonSettingsData = await JsonSettings.destroy({
      where: { userId },
    });
    return jsonSettingsData;
  }

  async findJsonSettings(userId) {
    const jsonSettingsData = await JsonSettings.findOne({
      where: {
        userId,
      },
    });
    return jsonSettingsData;
  }
}

module.exports = new JsonSettingsService();
