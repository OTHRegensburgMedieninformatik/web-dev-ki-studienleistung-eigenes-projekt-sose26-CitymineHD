const logger = require("../utils/logger.js");
const userStore = require("../models/user-store.js");

const home = {
    async index(request, response) {
        logger.info("profile-edit rendering");
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
        response.render("profile-edit", viewData);
    },

    async editMember(request, response) {
        const userId = request.params.id;
        const newStatus = request.body.status;
        await userStore.updateUserStatus(userId, newStatus);
        response.redirect("/profile");
    },

    async update(request, response) {
        const userId = request.params.id;
        const updatedData = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            birthday: request.body.birthday,
            postcode: request.body.postcode,
            mail: request.body.mail,
            address: request.body.address,
            city: request.body.city,
            phone: request.body.phone,
            handy: request.body.handy
        };
        await userStore.updateUserProfile(userId, updatedData);
        response.redirect("/profile");
    },

    async changePassword(request, response) {

        const userId = request.params.id;
        const currentPassword = request.body.currentPassword;
        const newPassword = request.body.newPassword;
        const confirmPassword = request.body.confirmNewPassword;

        if (newPassword !== confirmPassword) {
            response.status(400).json({
                success: false,
                message: "New password and confirm password do not match."
            });
            return;
        }

        const dbResponse = await userStore.changeUserPassword(userId, currentPassword, newPassword);

        if (dbResponse == undefined) {
            response.status(500).json({
                success: false,
                message: "Error changing password"
            });
        } else {
            request.session.destroy();
            response.status(200).json({
                success: true,
                message: "Password changed successfully."
            });
        }
    }
};

module.exports = home;