const logger = require("../utils/logger.js");
const newsStore = require("../models/news-store.js");
const parser = require("../models/json-to-text-parser.js");
const { raw } = require("body-parser");

const news = {
  async index(request, response) {
    let news = await newsStore.getAllNewsArticle();
    for (let index = 0; index < news.length; index++) {
      news[index].content = parser.parse(news[index].content);
    }
    logger.info("news rendering");
    const viewData = {
      title: "News",
      news: news,
      isAdmin: request.session.user && request.session.role === 'admin',
      isLogin: request.session.user
    };
    console.log(viewData);
    console.log(request.session)
    response.render("news", viewData);
  },
  async deleteNewsArticle(request, response) {
      const id = request.params.id;
      console.log(id);
      logger.debug("Deleting News Article ${id}");
      await newsStore.deleteNewsArticle(id);
      response.redirect("/news/");
  },
  async renderPreview(request, response) {

  },
  async addNewsArticle(request, response) {
    logger.debug("Adding new News Article to DB");
    console.log(request.body);
    await newsStore.addNewsArticle(request.session.userId, request.body.title, request.body.description, request.body.title_img, request.body.content);
    response.redirect("/news/");
  }
};

module.exports = news;