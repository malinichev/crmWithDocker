const siteDataService = require("../service/site-data-service");

class SiteDataControllers {
  async saveData(req, res, next) {
    try {
      const { siteData } = req.body;
      console.log("saveData", siteData);
      const data = await siteDataService.saveData(siteData);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getData(req, res, next) {
    try {
      const userData = await siteDataService.getData();
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SiteDataControllers();
