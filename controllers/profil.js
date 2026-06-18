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
        title: "PSC • Profil",
        favicon: "/src/header/psc_logo_154x154.png",
        isLogin: request.session.user,
        isAdmin: request.session.user && request.session.role === 'admin',
        userProfilePicture: request.session.user ? request.session.src_img  : null,
        userProfile: userProfile,
        userPositions: userPositions,
        applyStatus: applyStatus.status == 0 ? "<span class=\"yellow-dot\"></span> In Prüfung" : applyStatus.status == 1 ? "<span class=\"green-dot\"></span> Mitglied" : applyStatus.status == 2 ? "<span class=\"red-dot\"></span> Abgelehnt" : "<span class=\"grey-dot\"></span> Unbekannt",
        applys: applys,
        allMembers: allAllMembers,
        news: news
        };
        response.render("profile", viewData);
    },

    async editMemberStatus(request, response) {
        const userId = request.params.id;
        const newStatus = request.body.status;

        console.log(userId);
        console.log(newStatus);
        await userStore.updateUserStatus(userId, newStatus);

        response.redirect("/profile");
    },

    async editMemberPosition(request, response) {
        logger.info("Editing member position");
        const userId = request.params.id;
        const position = request.body.position;
        const positionGroup = request.body.positionGroup;

        if (position && positionGroup) {
            await userStore.addUserPosition(userId, position, positionGroup);
        }

        response.redirect("/profile");
    },

    async memberDetails(request, response) {
        logger.info("Fetching member details");
        const userId = request.params.user_id;

        const userDetails = await userStore.getUserById(userId);
        const userPositions = await userStore.getUserPosition(userId);

        response.json({userDetails, userPositions})
    },

    async deletePosition(request, response) {
        logger.info("Deleting member position");
        const userId = request.params.id;

        const position = request.body.position;
        const positionGroup = request.body.positionGroup;

        await userStore.deleteUserPosition(userId, position, positionGroup);

        response.redirect("/profile");
    }
};

module.exports = home;