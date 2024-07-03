const pagesService = require("../service/pages-service");

class PagesControllers {
  async savePageData(req, res, next) {
    try {
      const pageId = req.params.pageid;
      const { title, description, json } = req.body;
      console.log("savePageData", title, description, json);

      const data = await pagesService.savePageData(pageId, {
        title,
        description,
        json,
      });
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getPageData(req, res, next) {
    try {
      const pageId = req.params.pageid;
      const pageData = await pagesService.getPageData(pageId);
      return res.json(pageData);
    } catch (e) {
      next(e);
    }
  }

  async getAllPages(req, res, next) {
    try {
      const pagesData = await pagesService.getAllPages();
      return res.json(pagesData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PagesControllers();
