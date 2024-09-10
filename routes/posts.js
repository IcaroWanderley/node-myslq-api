const express = require('express');
const postsController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

// POST route for creating a new post
router.post("/", checkAuthMiddleware.checkAuth, postsController.save);

// GET route for fetching all posts
router.get("/", postsController.index);

// GET route for fetching a single post by ID
router.get("/:id", postsController.show);

// PATCH route for partially updating a post by ID (modifying only some fields)
router.patch("/:id", checkAuthMiddleware.checkAuth, postsController.update);

// PUT route for fully updating a post by ID (replacing all fields)
router.put("/:id", checkAuthMiddleware.checkAuth, postsController.update);

// DELETE route for deleting a post by ID
router.delete("/:id", checkAuthMiddleware.checkAuth, postsController.destroy);

module.exports = router;
