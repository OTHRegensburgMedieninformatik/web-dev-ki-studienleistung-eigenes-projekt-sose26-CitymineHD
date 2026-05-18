const logger = require("../utils/logger.js");
const userStore = require("../models/user-store.js")

const membership = {
  index(request, response) {
    logger.info("membership rendering");
    const viewData = {
      title: "Membership",
      isLogin: request.session.user,
      isAdmin: request.session.user && request.session.role === 'admin'
    };
    response.render("membership", viewData);
  },
  async addMembership(request, response) {
    logger.debug("Adding new Membership to DB");
    
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