const logger = require("../../utils/logger.js");

const appointments = {
  index(request, response) {
    logger.info("appointments rendering");
    const viewData = {
      title: "PSC • Termine",
      favicon: "/src/header/psc_logo_154x154.png",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("verein/appointments", viewData);
  },
};

module.exports = appointments;