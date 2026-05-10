const logger = require("../utils/logger.js");
const userStore = require("../models/user-store.js");

const home = {
    async index(request, response) {
        logger.info("profile rendering");
        const user = request.session.userId;
        const userProfile = await userStore.getUserById(user);
        const applyStatus = await userStore.getUserApplyStatus(user);
        const applys = await userStore.getAllUserApplys(user);
        const allAllMembers = await userStore.getAllUsers();

        const viewData = {
        title: "Profil",
        isLogin: request.session.user,
        isAdmin: request.session.user && request.session.role === 'admin',
        userProfile: userProfile,
        applyStatus: applyStatus.status == 0 ? "<span class=\"yellow-dot\"></span> In Prüfung" : applyStatus.status == 1 ? "<span class=\"green-dot\"></span> Mitglied" : applyStatus.status == 2 ? "<span class=\"red-dot\"></span> Abgelehnt" : "<span class=\"grey-dot\"></span> Unbekannt",
        applys: applys,
        allMembers: allAllMembers
        };
        response.render("profile", viewData);
    },

    async editMember(request, response) {
        const userId = request.params.id;
        const newStatus = request.body.status;
        await userStore.updateUserStatus(userId, newStatus);
        response.redirect("/profile");
    }
};

module.exports = home;