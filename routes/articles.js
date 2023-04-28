const express = require("express");

// Require Mongoose Model from article
const Article = require("../models/article");

// Instantiate a Router (a mini app that only handles routes)
const router = express.Router();

/**
 * Action:          INDEX
 * Method:          GET
 * URI:             /api/articles
 * Description:     Get all articles
 */

router.get(`/api/articles`, (req, res) => {
  Article.find()
    .then((allArticles) => res.json({ articles: allArticles }))
    .catch((error) => res.status(500).json({ error: error }));
});

/**
 * Action:          SHOW
 * Method:          GET
 * URI:             /api/articles/:id
 * Description:     Get a single article by ID
 */

router.get("/api/articles/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        res.json({ article: article });
      } else {
        //If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: "DocumentNotFound",
            message: "The provided ID doesn't match any documents",
          },
        });
      }
    })
    .catch((error) => res.status(500).json({ error: error }));
});

/**
 * Action:          DESTROY
 * Method:          DELETE
 * URI:             /api/articles/:id
 * Description:     Delete a single article by ID
 */

/**
 * Action:          UPDATE
 * Method:          PUT/Patch
 * URI:             /api/articles/:id
 * Description:     Update a single article by ID
 */

/**
 * Action:          CREATE
 * Method:          POST
 * URI:             /api/articles
 * Description:     Create a single article
 */

router.post("/api/articles", (req, res) => {
  Article.create(req.body.article)
    .then((newArticle) => res.status(201).json({ article: newArticle }))
    .catch((error) => res.status(500).json({ error: error }));
});

//Export the Router so we can use it in the 'server.s' file
module.exports = router;
