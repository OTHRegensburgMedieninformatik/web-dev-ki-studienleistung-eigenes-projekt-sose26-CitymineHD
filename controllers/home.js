const logger = require("../utils/logger.js");

// === Controller for Home page ===
// Page with general information about the club, no dynamic content yet, so no model is needed for now
// Page has serveral links in the frontend to the different departments

const home = {
  index(request, response) {
    logger.info("home rendering");
    const viewData = {
      title: "Peisinger Sportverein 1988 e.V.",
    };
    response.render("index", viewData);
  },
};

module.exports = home;