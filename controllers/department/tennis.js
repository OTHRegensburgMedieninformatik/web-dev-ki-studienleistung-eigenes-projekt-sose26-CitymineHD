const logger = require("../../utils/logger.js");

// === Controller for Tennis page ===
// Page with general information about the department, no dynamic content yet, so no model is needed for now
// Page is currently in progress

const tennis = {
  index(request, response) {
    logger.info("tennis rendering");

    //viewData:
    // title: "Soccer"
    // favicon: "/src/header/psc_logo_154x154.png" -> Favicon for the page, currently set to the psc logo
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
    const viewData = {
      title: "PSC • Tennis",
      favicon: "/src/header/psc_logo_154x154.png",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("department/tennis", viewData);
  },
};

module.exports = tennis;