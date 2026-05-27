const logger = require("../utils/logger.js");
const newsStore = require("../models/news-store.js");
const myparser = require("../models/json-to-text-parser.js");
const edjsParser = require("editorjs-parser");

const news = {
  async index(request, response) {
    let news = await newsStore.getAllNewsArticle();
    const parser = new edjsParser();
    
    for (let index = 0; index < news.length; index++) {
      //news[index].content = myparser.parse(news[index].content);
      news[index].content = parser.parse(JSON.parse(news[index].content));
    }
    logger.info("news rendering");
    const viewData = {
      title: "News",
      news: news,
      isAdmin: request.session.user && request.session.role === 'admin',
      isLogin: request.session.user
    };
    response.render("news", viewData);
  },
  async deleteNewsArticle(request, response) {
      const id = request.params.id;
      logger.info("Deleting News Article ${id}");
      await newsStore.deleteNewsArticle(id);
      response.redirect("/profile");
  },
  async renderPreview(request, response) {

  },
  async addNewsArticle(request, response) {
    logger.info("Adding new News Article to DB");
    const articleStatus = await newsStore.addNewsArticle(request.session.userId, request.body.title, request.body.description, request.body.src_img, request.body.content);

    if (articleStatus) {
      response.status(200).json({
        success: true,
        message: "News article added successfully."
      });
    } else {
      response.status(500).json({
        success: false,
        message: "Error adding news article. Please try again later."
      });
    }
  },

  async editNewsArticle(request, response) {
    logger.info("Editing News Article with id ${id}");
    const id = request.params.id;

    const articleStatus = await newsStore.editNewsArticle(id, request.body.title, request.body.description, request.body.src_img, request.body.content);

    if (articleStatus) {
      response.status(200).json({
        success: true,
        message: "News article added successfully."
      });
    } else {
      response.status(500).json({
        success: false,
        message: "Error adding news article. Please try again later."
      });
    }
  }
};

module.exports = news;