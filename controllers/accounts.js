const { error } = require("winston");
const userstore = require("../models/user-store.js");
const logger = require("../utils/logger.js");

// === Controller for Accounts ===
// Handles login, logout, signup, registration and authentication of users
// Also handles fetching the current user and their apply status for the profile page
// Models:
// - userStore for handling all database interactions regarding users

const accounts = {
    logout(request, response) {
        request.session.destroy();
        console.log("Session destroyed!")
        response.redirect("/");
    },

    // Register gets the user Data from the "Mitglied werden" form and adds the user to the database
    async register(request, response) {
        const user = request.body;
        await userstore.addUser(user);
        logger.info("Registering user", user);
        response.redirect("/");
    },

    // Authenticate gets the username and password from the login form and checks if they are correct, if so it adds the user to the session
    // Session Data:
    // - userId: user.id -> to identify the user in the database
    // - user: user.username -> to display the username in the frontend
    // - role: user.role -> to check if the user is an admin for displaying admin content in the frontend
    async authenticate(request, response) {
        const user = await userstore.authenticateUser(request.body.username, request.body.password);

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

    // Gets the the user profile who requests it, by using the userId from the session
    // Is needed for the profile page
    async getCurrentUser(request) {
        const user = request.session.userId;
        const userProfile = await userstore.getUserById(user);
        console.log(userProfile);
        return userProfile;
    },

    // Gets the apply status of the user who requests it, by using the userId from the session
    // Is needed for the profile page
    async getUserApplyStatus(request) {
        const user = request.session.userId;
        const applyStatus = await userstore.getUserApplyStatus(user);
        return applyStatus;
    }
};

module.exports = accounts;