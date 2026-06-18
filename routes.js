const express = require("express");
const auth = require("./utils/auth.js");
const multer = require("multer");
const router = express.Router();

const home = require("./controllers/home.js");
const news = require("./controllers/news.js");
const archive = require("./controllers/archive.js");
const membership = require("./controllers/membership.js");

const appointments = require("./controllers/verein/appointments.js");
const facility = require("./controllers/verein/facility.js");
const leading = require("./controllers/verein/leading.js");
const contact = require("./controllers/verein/contact.js");
const verein = require("./controllers/verein/verein.js");

const breitensport = require("./controllers/department/breitensport.js");
const soccer = require("./controllers/department/soccer.js");
const stockschuetzen = require("./controllers/department/stockschuetzen.js");
const tennis = require("./controllers/department/tennis.js");

const accounts = require("./controllers/accounts.js");
const profil = require("./controllers/profil.js");
const profil_edit = require("./controllers/profil-edit.js");



const uploadNews = multer({dest: "public/src/news/"});
const uploadProfile = multer({dest: "public/src/profile/"});



router.get("/", home.index);
router.get("/news", news.index);
router.get("/archive", archive.index);
router.get("/membership", membership.index);
router.post("/membership/apply", membership.addMembership)
router.get("/profile", auth.protectedUser, profil.index);
router.post("/profile/editStatus/:id", auth.protectedAdmin, profil.editMemberStatus);
router.post("/profile/editPosition/:id", auth.protectedAdmin, profil.editMemberPosition);
router.get("/profile/edit/", auth.protectedUser, profil_edit.index);
router.post("/profile/edit/:id", auth.protectedUser, profil_edit.update);
router.get("/profile/memberDetails/:user_id", auth.protectedAdmin, profil.memberDetails);
router.post("/profile/editPassword/:id", auth.protectedUser, profil_edit.changePassword);
router.post("/profile/deletePosition/:id", auth.protectedAdmin, profil.deletePosition);
router.post("/profile/uploadProfilePicture/:id", auth.protectedUser, uploadProfile.single("profilePicture"), profil_edit.uploadProfileImage);

router.get("/verein/termine", appointments.index);
router.get("/verein/anprechpartner", contact.index);
router.get("/verein/vorstandschaft", leading.index);
router.get("/verein/sportanlage", facility.index);
router.get("/verein/overview", verein.index);

router.get("/department/breitensport", breitensport.index);
router.get("/department/soccer", soccer.index);
router.get("/department/stockschuetzen", stockschuetzen.index);
router.get("/department/tennis", tennis.index);

router.get("/news/deleteNews/:id", auth.protectedAdmin, news.deleteNewsArticle);
router.post("/news/addNews", auth.protectedAdmin, uploadNews.single("src_img"), news.addNewsArticle);
router.post("/news/editNews/:id", auth.protectedAdmin, uploadNews.single("src_img"), news.editNewsArticle);

router.post("/verein/authenticate", accounts.authenticate);
router.get("/verein/logout", accounts.logout);

module.exports = router;