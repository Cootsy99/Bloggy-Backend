//require necessary NPM Packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const db = mongoose.connection;

// Require our Auth Related Packages
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Require DB Configuration File
const dbConfig = require("./config/db");

//Establish Database Connection
mongoose.connect(dbConfig);

db.on("error", (error) => console.log(`ERROR: ${error.message}`));
db.on("connected", () => console.log(`MongoDB Connected: ${dbConfig}`));
db.on("disconnected", () => console.log(`MongoDB Disconnected`));

// Require Passport Strategy and Options
const strategy = require("./lib/passportStrategy");
const jwtOptions = require("./lib/passportOptions");

// Require Route Files
const indexRouter = require("./routes/index");
const articlesRouter = require("./routes/articles");

//Instantiate Express Application Object
const app = express();

//Define PORT for the API to run on
const port = process.env.PORT || 5001;

/** Middleware */

// Add 'bodyparser' middleware which will parse JSON
// requests into a JavaScript Object before it reaches
// the route files
//
// The method '.use' sets up middleware for Express apps
app.use(express.json());

// Set CORS headers on response from this API using the 'cors' NPM package
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Define our auth strategy from before
passport.use(strategy);

/**
 * Routes
 *
 * Mount the imported Routers
 */

app.use(indexRouter);
app.use(articlesRouter);

//for testing purposes
app.get("/test", (req, res) => {
  bcrypt
    .hash("1234", 10)
    .then((hashResult) => res.json({ password: hashResult }));
});

// Dummy User for TESTING ONLY!!!
// Use Database for real use cases
const dummyUser = {
  id: 42,
  username: "jack",
  password: "1234",
};

app.post("/api/login", (req, res) => {
  if (req.body.username && req.body.password) {
    //This should be a database call...
    //
    // Example:
    // USer.findOne({ username: req.body.username, password: hash(req.body.password)})
    if (
      req.body.username === dummyUser.username &&
      req.body.password === dummyUser.password
    ) {
      //This user exists in our database and they provided a valid username and password
      const payload = {
        id: dummyUser.id,
        username: dummyUser.username,
      };

      // Build a JSON Web Token using the payload
      const token = jwt.sign(payload, jwtOptions.secretOrKey, {
        expiresIn: 600,
      });
      // Send the JSON Web Token back to the user
      res.json({ success: true, token: token });
    } else {
      res.status(401).json({ error: "invalid username or password" });
    }
  } else {
    res.status(400).json({ error: "Username & Password Required" });
  }
});

app.get(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "Hey, you can only see this message with a valid jwt",
      user: req.user,
    });
  }
);

// Start the server and listen for requests on the given port
app.listen(port, () => console.log(`bloggy is listening on port ${port}`));
