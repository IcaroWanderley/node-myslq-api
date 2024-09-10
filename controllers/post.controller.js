const models = require('../models');
const Validator = require('fastest-validator');

// Validator instance
const v = new Validator();

// Validation schema used in both save and update methods
const postSchema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false }
};

// Create a new post
function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId
    };

    const validationResponse = v.validate(post, postSchema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if (result) {
            models.Post.create(post).then(result => {
                res.status(201).json({
                    message: "Post created successfully",
                    post: result
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        } else {
            res.status(404).json({
                message: "Category not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Retrieve a single post by ID
function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Post not found!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        });
    });
}

// Retrieve all posts with pagination
function index(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    models.Post.findAndCountAll({
        limit: limit,
        offset: offset
    }).then(result => {
        res.status(200).json({
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page,
            posts: result.rows
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

// Update an existing post (PUT or PATCH)
function update(req, res) {
    const id = req.params.id;
    const userId = req.userData.userId;
    
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: userId
    };

    const validationResponse = v.validate(updatedPost, postSchema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if (result) {
            models.Post.update(updatedPost, { where: { id: id, userId: userId } }).then(result => {
                if (result[0] === 0) {
                    // If no rows were affected, post wasn't found or user isn't the owner
                    return res.status(404).json({ message: 'Post not found or not authorized.' });
                }
                res.status(200).json({
                    message: "Post updated successfully",
                    post: updatedPost
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            });
        } else {
            res.status(404).json({
                message: "Invalid Category ID!"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Delete a post by ID
function destroy(req, res) {
    const id = req.params.id;
    const userId = req.userData.userId;

    models.Post.destroy({ where: { id: id, userId: userId } }).then(result => {
        if (result === 0) {
            return res.status(404).json({ message: "Post not found or not authorized." });
        }
        res.status(200).json({
            message: "Post deleted successfully"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        });
    });
}

module.exports = {
    save,
    show,
    index,
    update,
    destroy
};
