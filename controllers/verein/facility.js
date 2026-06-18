const logger = require("../../utils/logger.js");

const facility = {
  index(request, response) {
    logger.info("facility rendering");
    const viewData = {
      title: "PSC • Sportanlage",
    };
    response.render("verein/facility", viewData);
  },
};

module.exports = facility;