const { error } = require("winston");
const userstore = require("../models/user-store.js");
const logger = require("../utils/logger.js");

const accounts = {
<<<<<<< Updated upstream
    login(request, response) {
        const viewData = {
            title: "Login to the Service"
        };
        response.render("login", viewData);
    },

=======
>>>>>>> Stashed changes
    logout(request, response) {
        request.session.destroy();
        console.log("Session destroyed!")
        response.redirect("/");
    },

<<<<<<< Updated upstream
    signup(request, response) {
        const viewData = {
            title: "Signup for the Service"
        };
        response.render("signup", viewData);
    },

=======
    // Register gets the user Data from the "Mitglied werden" form and adds the user to the database
>>>>>>> Stashed changes
    async register(request, response) {
        const user = request.body;
        await userstore.addUser(user);
        logger.info("Registering user", user);
        response.redirect("/");
    },

    async authenticate(request, response) {
        let user = await userstore.authenticateUser(request.body.username, request.body.password);

        if (user) {
            request.session.userId = user.id;
            request.session.user = user.username;
            request.session.role = user.role;
            logger.info("User successfully authenticated and added to session", user);

            response.status(200).json({
                success: true,
            })
        } else {
            response.status(500).json({
                success: false,
                message: "Invalid username or password"
            })
        }
    },

    async getCurrentUser(request) {
        const user = request.session.userId;
        const userProfile = await userstore.getUserById(user);
        console.log(userProfile);
        return userProfile;
    },

    async getUserApplyStatus(request) {
        const user = request.session.userId;
        const applyStatus = await userstore.getUserApplyStatus(user);
        return applyStatus;
    }
};

module.exports = accounts;