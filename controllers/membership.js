const logger = require("../utils/logger.js");
const userStore = require("../models/user-store.js")

// === Controller for Membership page ===
// Page for the signup form for new members and general information about the apply process

const membership = {
  index(request, response) {
    logger.info("membership rendering");

    //viewData:
    // title: "Soccer"
    // isLogin: request.session.user -> to check if user is logged in
    // isAdmin: request.session.user && request.session.role === 'admin' -> to check if user is admin
    const viewData = {
      title: "Membership",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("membership", viewData);
  },

  // Main functionality for this page, adding a new membership to the database
  async addMembership(request, response) {
    logger.debug("Adding new Membership to DB");
    
    // Create a new membership object with the data from the request body
    const membership = {
      lastname: request.body.lastName,
      firstname: request.body.firstName,
      birthday: request.body.birthDate,
      address: request.body.address,
      postcode: request.body.postCode,
      city: request.body.city,
      phone: request.body.phone,
      handy: request.body.mobile,
      mail: request.body.email,
      bank_firstname: request.body.accountOwnerFirstName,
      bank_lastname: request.body.accountOwnerLastName,
      bank_address: request.body.accountOwnerAddress,
      iban: request.body.accountIBAN,
      bic: request.body.accountBIC,
      institut: request.body.accountBank,
      department: request.body.department,
      privacy: request.body.privacy1,
      newsletter: request.body.privacy2
    }

    // Error types: -> Response status 500, Render an error message in the frontend
    // 1. Missing required fields (lastname, firstname, birthday, address, postcode, city, phone, mail, department, privacy)
    // 2. Database error (e.g. connection error, validation error)
    const newUser = await userStore.addUser(membership);
    if (newUser) {
      response.status(200).json({
        success: true,
        user: newUser
      });
    } else {
      response.status(500).json({
        success: false,
        message: "Error adding membership. Please try again later."
      });
    }
  }
};

module.exports = membership;