const logger = require("../utils/logger.js");

const archive = {
  index(request, response) {
    logger.info("archive rendering");
<<<<<<< Updated upstream
=======

    //viewData:
    // title: "Soccer"
    // favicon: "/src/header/psc_logo_154x154.png" -> Favicon for the page, currently set to the psc logo
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
>>>>>>> Stashed changes
    const viewData = {
      title: "PSC • Archive",
      favicon: "/src/header/psc_logo_154x154.png",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("archive", viewData);
  },
};

module.exports = archive;