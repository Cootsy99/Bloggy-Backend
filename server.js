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

//Instantiate Express Application Object
const app = express();

//Define PORT for the API to run on
const port = process.env.PORT || 5001;

/**
 * Routes
 *
 * Mount the imported Routers
 */

app.use(indexRouter);

// Start the server and listen for requests on the given port
app.listen(port, () => console.log(`bloggy is listening on port ${port}`));
