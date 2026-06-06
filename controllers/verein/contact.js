const logger = require("../../utils/logger.js");
const contactStore = require("../../models/contact-store.js");

const contact = {
  async index(request, response) {
    let soccer = await contactStore.getContactsByPositionGroup("Ausschuss_Fußball");
    let breitensport = await contactStore.getContactsByPositionGroup("Ausschuss_Breitensport");
    let tennis = await contactStore.getContactsByPositionGroup("Ausschuss_Tennis");
    let stockschützen = await contactStore.getContactsByPositionGroup("Ausschuss_Stockschützen");

    const weights = {
      "1. Abteilungsleiter" : 1,
      "2. Abteilungsleiter" : 2,
      "1. Jugendleiter Abt. Fußball" : 3,
      "2. Jugendleiter Abt. Fußball" : 4,
    };

    soccer.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

    breitensport.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

    tennis.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

    stockschützen.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

    logger.info("contact rendering");
    const viewData = {
      title: "PSC • Ansprechpartner",
      favicon: "/src/header/psc_logo_154x154.png",
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