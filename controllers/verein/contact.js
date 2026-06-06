const logger = require("../../utils/logger.js");
const contactStore = require("../../models/contact-store.js");

const contact = {
  async index(request, response) {
    let soccer = [...await contactStore.getContactsByPositionGroup("fCommittee"), ...await contactStore.getContactsByPositionGroup("fAbtLeading")];
    let breitensport = [...await contactStore.getContactsByPositionGroup("bCommittee"), ...await contactStore.getContactsByPositionGroup("bAbtLeading")];
    let stockschützen = [...await contactStore.getContactsByPositionGroup("sCommittee"), ...await contactStore.getContactsByPositionGroup("sAbtLeading")];
    let tennis = [...await contactStore.getContactsByPositionGroup("tCommittee"), ...await contactStore.getContactsByPositionGroup("tAbtLeading")];

    const weights = {
      "Abteilungsleiter" : 1,
      "Jugendleiter" : 2,
      "Ausschuss" : 3,
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
      isAdmin: request.session.user && request.session.role === 'admin',
      userProfilePicture: request.session.user ? request.session.src_img  : null
    };
    response.render("verein/contact", viewData);
  },
};

module.exports = contact;