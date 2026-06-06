const logger = require("../../utils/logger.js");


// === Controller for Breitensport page ===
// Page with general information about the department, no dynamic content yet, so no model is needed for now
// Page is currently in progress

const breitensport = {
  index(request, response) {
    logger.info("breitensport rendering");

    //viewData:
    // title: "Soccer"
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
    const viewData = {
      title: "Breitensport",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("department/breitensport", viewData);
  },
};

module.exports = breitensport;