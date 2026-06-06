const logger = require("../../utils/logger.js");
const userStore = require("../../models/user-store.js");

// === Controller for Soccer page ===
// Page with general information about the department, dynamic content is the teams and their trainers, which are fetched from the database
// Models: user-store for fetching the teams and their trainers from the database

const soccer = {
  //index render all teams with their trainers dynamically, sorted by position (Trainer, Co-Trainer, Betreuer)
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
<<<<<<< Updated upstream
=======

    //viewData:
    // title: "Soccer"
    // favicon: "/src/header/psc_logo_154x154.png" -> Favicon for the page, currently set to the psc logo
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
    // teams: teams -> Sorted Array of teams with their trainers
>>>>>>> Stashed changes
    const viewData = {
      title: "PSC • Fußball",
      favicon: "/src/header/psc_logo_154x154.png",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin',
      teams: teams
    };
    response.render("department/soccer", viewData);
  },
};

module.exports = soccer;