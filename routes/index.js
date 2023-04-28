const express = require("express");

// Instantiate a Router (a mini app that only handles routes)
const router = express.Router();

/**
 * Action:          INDEX
 * Method:          GET
 * URI              /
 * Description:     Get the route route
 */

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Bloggy" });
});

// Export the Router so we can use it in the 'server.js' file
module.exports = router;
