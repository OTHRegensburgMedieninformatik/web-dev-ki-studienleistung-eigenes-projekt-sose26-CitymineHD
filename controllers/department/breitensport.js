const logger = require("../../utils/logger.js");

const breitensport = {
  index(request, response) {
    logger.info("breitensport rendering");
    const viewData = {
      title: "Breitensport",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("department/breitensport", viewData);
  },
};

module.exports = breitensport;