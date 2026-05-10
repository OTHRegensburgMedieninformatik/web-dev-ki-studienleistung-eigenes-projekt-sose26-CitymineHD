const logger = require("../../utils/logger.js");

const facility = {
  index(request, response) {
    logger.info("facility rendering");
    const viewData = {
      title: "Facility",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("verein/facility", viewData);
  },
};

module.exports = facility;