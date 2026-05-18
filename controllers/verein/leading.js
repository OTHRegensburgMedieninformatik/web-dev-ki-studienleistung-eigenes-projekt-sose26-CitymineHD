const logger = require("../../utils/logger.js");
const leadingStore = require("../../models/leading-store.js");

const leading = {
  async index(request, response) {
    let leadings = await leadingStore.getAllLeadings();
    logger.info("leading rendering");

    const weights = {
      "1. Vorstand" : 1,
      "2. Vorstand" : 2,
      "3. Vorstand" : 3,
      "Jugendleiter" : 4,
      "Schriftführer" : 5,
    };

    leadings.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

    console.log(leadings);
    const viewData = {
      title: "Leading",
      leading: leadings,
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("verein/leading", viewData);
  },
};

module.exports = leading;