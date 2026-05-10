const logger = require("../../utils/logger.js");

const stockschuetzen = {
  index(request, response) {
    logger.info("stockschuetzen rendering");
    const viewData = {
      title: "Stockschützen",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("department/stockschuetzen", viewData);
  },
};

module.exports = stockschuetzen;