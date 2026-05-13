const logger = require("../../utils/logger.js");
const userStore = require("../../models/user-store.js");

const soccer = {
  async index(request, response) {
    const teams = await userStore.getTeams();

    logger.info("soccer rendering");
    const viewData = {
      title: "Soccer",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin',
      teams: teams
    };
    response.render("department/soccer", viewData);
  },
};

module.exports = soccer;