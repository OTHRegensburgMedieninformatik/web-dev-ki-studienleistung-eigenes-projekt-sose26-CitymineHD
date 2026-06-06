const logger = require("../../utils/logger.js");

const verein = {
  index(request, response) {
    logger.info("verein rendering");
    const viewData = {
      title: "PSC • Verein",
      favicon: "/src/header/psc_logo_154x154.png",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin',
      userProfilePicture: request.session.user ? request.session.src_img  : null
    };
    response.render("verein/verein", viewData);
  },
};

module.exports = verein;