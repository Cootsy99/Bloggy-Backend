//require necessary NPM Packages
const express = require("express");
const mongoose = require("mongoose");

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
