const { SiteData } = require("../models");

class SiteDataService {
  async saveData(newSiteData) {
    const siteData = await SiteData.findByPk(1);
    if (siteData) {
      siteData.siteData = JSON.stringify(siteData);
      return siteData.save();
    }

    const data = await SiteData.create({
      siteData: newSiteData,
    });

    return data;
  }

  async getData() {
    const siteData = await SiteData.findByPk(1);

    return {
      siteData,
    };
  }
}

module.exports = new SiteDataService();
