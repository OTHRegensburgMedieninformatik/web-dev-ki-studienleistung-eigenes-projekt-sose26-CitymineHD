const logger = require("../../utils/logger.js");
const leadingStore = require("../../models/leading-store.js");

const leading = {
  async index(request, response) {
    const leadings = await leadingStore.getAllLeadings();
    logger.info("leading rendering");
    const viewData = {
      title: "Leading",
      firstRow: leadings.slice(0, 3),
      secondRow: leadings.slice(3),
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("verein/leading", viewData);
  },
};

module.exports = leading;