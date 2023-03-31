const Comment = require("../models/Comment");

const createComment = async (req, res, next) => {
    try {
        const id = req.user.id;
        const postId = req.params.id;
        const data = { ...req.body, author: id, postId };
        const post = new Comment(data);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

module.exports = { createComment };
