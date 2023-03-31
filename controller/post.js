const Comment = require("../models/Comment");
const Post = require("../models/Post");
const createError = require("../utils/error");

const createPost = async (req, res, next) => {
    try {
        const id = req.user.id;
        const data = { ...req.body, author: id };
        const post = new Post(data);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

const upVote = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) return next(createError(404, "post not found"));

        if (post.upvotes.includes(userId))
            return next(createError(500, "You have already voted"));
        if (post.downvotes.includes(userId)) {
            const index = post.downvotes.indexOf(userId);
            post.downvotes.splice(index, 1);
        }
        post.upvotes.push(userId);
        const vote = post.upvotes.length - post.downvotes.length;
        post.votes = vote;
        await post.save();
        res.status(200).send("Your response has been recorded");
    } catch (error) {
        next(error);
    }
};

const downVote = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) return next(createError(404, "post not found"));

        if (post.downvotes.includes(userId))
            return next(createError(500, "You have already voted"));

        if (post.upvotes.includes(userId)) {
            const index = post.upvotes.indexOf(userId);
            post.upvotes.splice(index, 1);
        }
        post.downvotes.push(userId);
        const vote = post.upvotes.length - post.downvotes.length;
        post.votes = vote;
        await post.save();
        res.status(200).send("Your response has been recorded");
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        await Post.findByIdAndDelete(postId);
        try {
            await Comment.deleteMany({ postId });
        } catch (error) {
            return next(error);
        }
        res.status(201).send("Post deleted successfully");
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: req.body },
            { new: true }
        );
        res.status(201).json(updatedPost);
    } catch (error) {
        next(error);
    }
};

const getAllPost = async (req, res, next) => {
    try {
        const qNew = req.query.new;
        const qVote = req.query.vote;
        let posts;
        if (qNew) {
            posts = await Post.find({}).sort({ createdAt: -1 });
        } else if (qVote) {
            posts = await Post.find({}).sort({ votes: -1 });
        } else {
            posts = await Post.find({});
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

const getPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) return next(createError(404, "Post not found"));
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    upVote,
    downVote,
    deletePost,
    updatePost,
    getAllPost,
    getPost,
};
