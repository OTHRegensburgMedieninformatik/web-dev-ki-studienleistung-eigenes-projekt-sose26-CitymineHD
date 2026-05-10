const logger = require("../../utils/logger.js");

const verein = {
  index(request, response) {
    logger.info("verein rendering");
    const viewData = {
      title: "Verein",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("verein/verein", viewData);
  },
};

module.exports = verein;