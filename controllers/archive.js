const logger = require("../utils/logger.js");

// === Controller for Archive page ===
// Page is currently not in use

const archive = {
  index(request, response) {
    logger.info("archive rendering");

    //viewData:
    // title: "Soccer"
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
    const viewData = {
      title: "Archive",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("archive", viewData);
  },
};

module.exports = archive;