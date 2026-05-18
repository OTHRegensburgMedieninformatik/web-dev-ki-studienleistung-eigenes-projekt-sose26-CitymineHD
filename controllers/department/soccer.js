const logger = require("../../utils/logger.js");
const userStore = require("../../models/user-store.js");

const soccer = {
  async index(request, response) {
    const teams = await userStore.getTeams();

    const weights = {
      "Trainer" : 1,
      "Co-Trainer" : 2,
      "Betreuer" : 3,
    };

    teams.G_Jugend.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

    teams.F_Jugend.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

    teams.E_Jugend.sort((a, b) => {
      const posA = weights[a.position] || 99;
      const posB = weights[b.position] || 99;
      return posA - posB;
    })

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