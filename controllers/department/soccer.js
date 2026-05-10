const logger = require("../../utils/logger.js");

const soccer = {
  index(request, response) {
    logger.info("soccer rendering");
    const viewData = {
      title: "Soccer",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("department/soccer", viewData);
  },
};

module.exports = soccer;