const logger = require("../../utils/logger.js");

const verein = {
  index(request, response) {
    logger.info("verein rendering");
    const viewData = {
      title: "PSC • Verein",
    };
    response.render("verein/verein", viewData);
  },
};

module.exports = verein;