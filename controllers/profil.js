const logger = require("../utils/logger.js");
const userStore = require("../models/user-store.js");
const newsStore = require("../models/news-store.js");

const home = {
    async index(request, response) {
        logger.info("profile rendering");
        const user = request.session.userId;
        const userProfile = await userStore.getUserById(user);
        const userPositions = await userStore.getUserPosition(user);
        const applyStatus = await userStore.getUserApplyStatus(user);
        const applys = await userStore.getAllUserApplys();
        const allAllMembers = await userStore.getAllUsers();
        const news = await newsStore.getAllNewsArticle();

        const viewData = {
        title: "Profil",
        isLogin: request.session.user,
        isAdmin: request.session.user && request.session.role === 'admin',
        userProfile: userProfile,
        userPositions: userPositions,
        applyStatus: applyStatus.status == 0 ? "<span class=\"yellow-dot\"></span> In Prüfung" : applyStatus.status == 1 ? "<span class=\"green-dot\"></span> Mitglied" : applyStatus.status == 2 ? "<span class=\"red-dot\"></span> Abgelehnt" : "<span class=\"grey-dot\"></span> Unbekannt",
        applys: applys,
        allMembers: allAllMembers,
        news: news
        };
        response.render("profile", viewData);
    },

    async editMember(request, response) {
        const userId = request.params.id;
        const newStatus = request.body.status;

        console.log(userId);
        console.log(newStatus);
        await userStore.updateUserStatus(userId, newStatus);

        const position = request.body.position;
        const positionGroup = request.body.positionGroup;

        if (position && positionGroup) {
            await userStore.addUserPosition(userId, position, positionGroup, '/psc_logo.png');
        }

        response.redirect("/profile");
    },

    async memberDetails(request, response) {
        const userId = request.params.user_id;

        const userDetails = await userStore.getUserById(userId);
        const userPositions = await userStore.getUserPosition(userId);

        console.log(userDetails);

        response.json({userDetails, userPositions})
    },

    async deletePosition(request, response) {
        const userId = request.params.id;
        
    }
};

module.exports = home;