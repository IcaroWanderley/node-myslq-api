const models = require('../models');
const Validator = require('fastest-validator');

function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId
    }

    console.log(req.userData);

    const schema = {
        title: {type: "string", optional: false, max: "100"},
        content: {type: "string", optional: false, max: "500"},
        categoryId: {type: "number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if(result !== null){
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
        }else{
            res.status(404).json({
                message: "Category not found!"
            });
        }
    });
}

function show(req, res){
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);  
        }else{
            res.status(404).json({
                message: "Post not found!"
            })
        } 
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong!"
        })
    });
    
}

function index(req, res){
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
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

function update(req, res){
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId
    }
    const userId = req.userData.userId;

    const schema = {
        title: {type: "string", optional: false, max: "100"},
        content: {type: "string", optional: false, max: "500"},
        categoryId: {type: "number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if(result !== null){
            models.Post.update(updatedPost, {where: {id: id, userId: userId}}).then(result => {
                console.log('Update result:', result); // Adicione este log
                res.status(200).json({
                    message: "Post updated successfully",
                    post: updatedPost
                });
            }).catch(error => {
                console.log('Update error:', error); // Adicione este log
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            })
        }else{
            res.status(404).json({
                message: "Invalid Category ID!"
            });
        }
    }).catch(error => {
        console.log('Category find error:', error); // Adicione este log
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });

}

function destroy(req, res){
    const id = req.params.id;
    const userId = req.userData.userId;

    models.Post.destroy({where: {id: id, userId: userId}}).then(result => {
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
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}