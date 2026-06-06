const logger = require("../utils/logger.js");
const newsStore = require("../models/news-store.js");
const myparser = require("../models/json-to-text-parser.js");
const edjsParser = require("editorjs-parser");
const multer = require("multer");

const news = {
  async index(request, response) {
    let news = await newsStore.getAllNewsArticle();
    const parser = new edjsParser();
    
    for (let index = 0; index < news.length; index++) {
      //news[index].content = myparser.parse(news[index].content);
      news[index].content = parser.parse(JSON.parse(news[index].content));
    }
    logger.info("news rendering");
<<<<<<< Updated upstream
=======

    //viewData:
    // title: "Soccer"
    // favicon: "/src/header/psc_logo_154x154.png" -> Favicon for the page, currently set to the psc logo
    // news: news -> list of all HTML parsed news articles
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
>>>>>>> Stashed changes
    const viewData = {
      title: "PSC • News",
      favicon: "/src/header/psc_logo_154x154.png",
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

    let img = null;
    if (request.file != undefined) {
      img = "/src/news/" + request.file.filename;
    }
    
    const articleStatus = await newsStore.addNewsArticle(request.session.userId, request.body.title, request.body.description, img, request.body.content);

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

    let file = request.body.existing_src_img; // Default to existing image if no new image is uploaded
    if (request.file != undefined) {
      file = "/src/news/" + request.file.filename
    }

    console.log(file);

    const articleStatus = await newsStore.editNewsArticle(id, request.body.title, request.body.description, file, request.body.content);

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