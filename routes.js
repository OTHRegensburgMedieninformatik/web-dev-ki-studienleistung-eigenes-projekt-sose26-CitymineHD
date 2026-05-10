const express = require("express");
const auth = require("./utils/auth.js");
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

router.get("/", home.index);
router.get("/news", news.index);
router.get("/archive", archive.index);
router.get("/membership", membership.index);
router.post("/membership/apply", membership.addMembership)
router.get("/profile", auth.protected, profil.index);
router.post("/profile/editMember/:id", auth.protected, profil.editMember);
router.get("/profile/edit/", auth.protected, profil_edit.index);
router.post("/profile/edit/:id", auth.protected, profil_edit.update);

router.get("/verein/termine", appointments.index);
router.get("/verein/anprechpartner", contact.index);
router.get("/verein/vorstandschaft", leading.index);
router.get("/verein/sportanlage", facility.index);
router.get("/verein/overview", verein.index);

router.get("/department/breitensport", breitensport.index);
router.get("/department/soccer", soccer.index);
router.get("/department/stockschuetzen", stockschuetzen.index);
router.get("/department/tennis", tennis.index);

router.get("/news/deleteNews/:id", auth.protected, news.deleteNewsArticle);
router.post("/news/addNews", auth.protected, news.addNewsArticle);

router.post("/verein/authenticate", accounts.authenticate);
router.get("/verein/logout", accounts.logout);

module.exports = router;