const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); // Register custom helpers

const sess = {
  // Session configuration
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

app.use(routes); // Mount all routes

sequelize.sync({ force: false }).then(() => {
  // Start the server, listening on the specified port or defaulting to 3001
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
