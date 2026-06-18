const logger = require("../../utils/logger.js");
const userStore = require("../../models/user-store.js");

const contact = {
  async index(request, response) {
    let soccer = [...await userStore.getContactsByPositionGroup("fCommittee"), ...await userStore.getContactsByPositionGroup("fAbtLeading")];
    let breitensport = [...await userStore.getContactsByPositionGroup("bCommittee"), ...await userStore.getContactsByPositionGroup("bAbtLeading")];
    let stockschützen = [...await userStore.getContactsByPositionGroup("sCommittee"), ...await userStore.getContactsByPositionGroup("sAbtLeading")];
    let tennis = [...await userStore.getContactsByPositionGroup("tCommittee"), ...await userStore.getContactsByPositionGroup("tAbtLeading")];

    const weights = {
      "1. Abteilungsleiter" : 1,
      "2. Abteilungsleiter" : 2,
      "1. Jugendleiter" : 3,
      "2. Jugendleiter" : 4,
      "Ausschuss" : 5,
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