const logger = require("../../utils/logger.js");

const tennis = {
  index(request, response) {
    logger.info("tennis rendering");
    const viewData = {
      title: "Tennis",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("department/tennis", viewData);
  },
};

module.exports = tennis;