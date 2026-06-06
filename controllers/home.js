const logger = require("../utils/logger.js");

// === Controller for Home page ===
// Page with general information about the club, no dynamic content yet, so no model is needed for now
// Page has serveral links in the frontend to the different departments

const home = {
  index(request, response) {
    logger.info("home rendering");

    //viewData:
    // title: "Soccer"
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
    const viewData = {
      title: "Welcome to Playlist!",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("index", viewData);
  },
};

module.exports = home;