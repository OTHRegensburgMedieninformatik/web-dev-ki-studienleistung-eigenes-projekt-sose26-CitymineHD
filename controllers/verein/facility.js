const logger = require("../../utils/logger.js");

const facility = {
  index(request, response) {
    logger.info("facility rendering");
    const viewData = {
      title: "PSC • Sportanlage",
      favicon: "/src/header/psc_logo_154x154.png",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin',
      userProfilePicture: request.session.user ? request.session.src_img  : null
    };
    response.render("verein/facility", viewData);
  },
};

module.exports = facility;