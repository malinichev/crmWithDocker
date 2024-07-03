const { Pages } = require("../models");

class PagesService {
  async savePageData(pageId, newData) {
    const findPage = await Pages.findByPk(pageId);

    let pageData = {};

    if (findPage) {
      pageData = findPage;
    }

    if (newData && newData?.json) {
      pageData.json = newData.json;
    }

    if (newData && newData?.title) {
      pageData.title = newData.title;
    }

    if (newData && newData?.description) {
      pageData.description = newData.description;
    }

    if (findPage) {
      return pageData.save();
    } else {
      const data = await Pages.create(pageData);

      return data;
    }
  }

  async getPageData(pageId) {
    const pageData = await Pages.findByPk(pageId);

    return pageData;
  }

  async getAllPages() {
    const pagesData = await Pages.findAll({
      attributes: ["id"],
    });

    return pagesData;
  }
}

module.exports = new PagesService();
