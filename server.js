//require necessary NPM Packages
const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection;

//Require DB Configuration File
const dbConfig = require("./config/db");

//Establish Database Connection
mongoose.connect(dbConfig);

db.on("error", (error) => console.log(`ERROR: ${error.message}`));
db.on("connected", () => console.log(`MongoDB Connected: ${dbConfig}`));
db.on("disconnected", () => console.log(`MongoDB Disconnected`));

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

/**
 * Routes
 *
 * Mount the imported Routers
 */

app.use(indexRouter);
app.use(articlesRouter);

// Start the server and listen for requests on the given port
app.listen(port, () => console.log(`bloggy is listening on port ${port}`));
