const logger = require("../utils/logger.js");
const userStore = require("../models/user-store.js");
const newsStore = require("../models/news-store.js");
const positionTagParser = require("../models/position_tag_parser.js");

// === Controller for Profile page ===
// Page with user profile information, application status and user positions
// Admins can see all users and their application status and can edit the application status and user positions of all users
// Additionaly admins can add, edit and delete news articles

const home = {
    async index(request, response) {
        logger.info("profile rendering");
        const user = request.session.userId;
        const userProfile = await userStore.getUserById(user);
        let userPositions = await userStore.getUserPosition(user);
        const applyStatus = await userStore.getUserApplyStatus(user);
        const applys = await userStore.getAllUserApplys();
        const allAllMembers = await userStore.getAllUsers();
        const news = await newsStore.getAllNewsArticle();

        //viewData:
        // title: "Profil"
        // favicon: "/src/header/psc_logo_154x154.png" -> Favicon for the page, currently set to the psc logo
        // isLogin: request.session.user -> to check if user is logged in
        // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
        // userProfile: userProfile -> Personal information of the user
        // applyStatus: applyStatus.status == 0 ? "In Prüfung" : applyStatus.status == 1 ? "Mitglied" : applyStatus.status == 2 ? "Abgelehnt" : "Unbekannt" -> Application status of the user
        // applys: applys -> List of all applications of all users, only for admins visible
        // allMembers: allAllMembers -> List of all members, only for admins visible
        // news: news -> List of all news articles, only for admins visible
        const viewData = {
        title: "PSC • Profil",
        userProfile: userProfile,
        userPositions: positionTagParser.positionTagParser(userPositions),
        applyStatus: applyStatus.status == 0 ? "<span class=\"yellow-dot\"></span> In Prüfung" : applyStatus.status == 1 ? "<span class=\"green-dot\"></span> Mitglied" : applyStatus.status == 2 ? "<span class=\"red-dot\"></span> Abgelehnt" : "<span class=\"grey-dot\"></span> Unbekannt",
        applys: applys,
        allMembers: allAllMembers,
        news: news
        };
        response.render("profile", viewData);
    },

    // Edit member Status -> Only for admins available, button in frontend grayed out otherwise, editing the application status of a user, e.g. from "In Prüfung" to "Mitglied" or "Abgelehnt"
    // If their is an database error during the writing the status and an not parsable status is given, the status will be set to "Unbekannt"
    async editMemberStatus(request, response) {
        const userId = request.params.id;
        const newStatus = request.body.status;
        await userStore.updateUserStatus(userId, newStatus);

        response.redirect("/profile");
    },

    // Edit member Position -> Only for admins available, button in frontend grayed out otherwise, adding a new position to a user
    async editMemberPosition(request, response) {
        logger.info("Editing member position");
        const userId = request.params.id;
        const position = request.body.position;
        const positionGroup = request.body.positionGroup;

        // Check is important, because "position" is a free text field and can be empty
        if (position && positionGroup) {
            await userStore.addUserPosition(userId, position, positionGroup);
        }

        response.redirect("/profile");
    },

    // Member Details -> Only for admins available, button in frontend grayed out otherwise, fetching the personal information and all another details of a user
    async memberDetails(request, response) {
        logger.info("Fetching member details");
        const userId = request.params.user_id;

        const userDetails = await userStore.getUserById(userId);
        let userPositions = await userStore.getUserPosition(userId);

        userPositions = positionTagParser.positionTagParser(userPositions);

        response.json({userDetails, userPositions})
    },

    // Delete Position -> Only for admins available, button in frontend grayed out otherwise, deleting a position of a user
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