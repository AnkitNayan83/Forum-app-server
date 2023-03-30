const Post = require("../models/Post");

const createPost = async (req, res, next) => {
    try {
        const id = req.user.id;
        const data = { ...req.body, author: id };
        console.log(data);
        const post = new Post(data);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

module.exports = { createPost };
