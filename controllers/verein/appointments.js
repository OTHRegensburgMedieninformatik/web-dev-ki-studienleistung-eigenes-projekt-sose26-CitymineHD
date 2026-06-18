const logger = require("../../utils/logger.js");

const appointments = {
  index(request, response) {
    logger.info("appointments rendering");
    const viewData = {
      title: "PSC • Termine",
    };
    response.render("verein/appointments", viewData);
  },
};

module.exports = appointments;