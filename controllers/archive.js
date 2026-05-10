const logger = require("../utils/logger.js");

const archive = {
  index(request, response) {
    logger.info("archive rendering");
    const viewData = {
      title: "Archive",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("archive", viewData);
  },
};

module.exports = archive;