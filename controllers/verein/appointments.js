const logger = require("../../utils/logger.js");

const appointments = {
  index(request, response) {
    logger.info("appointments rendering");
    const viewData = {
      title: "Appointments",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("verein/appointments", viewData);
  },
};

module.exports = appointments;