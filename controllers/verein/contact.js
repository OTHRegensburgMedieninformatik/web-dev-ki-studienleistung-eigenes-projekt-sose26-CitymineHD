const logger = require("../../utils/logger.js");
const contactStore = require("../../models/contact-store.js");

const contact = {
  async index(request, response) {
    const soccer = await contactStore.getContactsByPositionGroup("Ausschuss_Fußball");
    const breitensport = await contactStore.getContactsByPositionGroup("Ausschuss_Breitensport");
    const tennis = await contactStore.getContactsByPositionGroup("Ausschuss_Tennis");
    const stockschützen = await contactStore.getContactsByPositionGroup("Ausschuss_Stockschützen");

    logger.info("contact rendering");
    const viewData = {
      title: "Contact",
      soccer: soccer,
      breitensport: breitensport,
      tennis: tennis,
      stockschützen: stockschützen,
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("verein/contact", viewData);
  },
};

module.exports = contact;