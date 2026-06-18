const logger = require("../utils/logger.js");

// === Controller for Archive page ===
// Page is currently not in use

const archive = {
  index(request, response) {
    logger.info("archive rendering");

    //viewData:
    // title: "Soccer"
    // favicon: "/src/header/psc_logo_154x154.png" -> Favicon for the page, currently set to the psc logo
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
    const viewData = {
      title: "PSC • Archive",
    };
    response.render("archive", viewData);
  },
};

module.exports = archive;