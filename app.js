const express = require("express");
const logger = require("./utils/logger");
const handlebars = require("express-handlebars");
const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

//required to parse the body of a post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "This is a secret!",
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}));

app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs')  ;
app.set('views', './views');

const routes = require("./routes.js");
app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log(`Web App template listening on ${process.env.PORT}`);
});

app.use(express.static('public'));
module.exports = app;