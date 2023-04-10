const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res, next) => {
    try {
        const id = req.user.id;
        const postId = req.params.id;
        const data = { ...req.body, author: id, postId };
        const post = await Post.findById(postId);
        const comment = new Comment(data);
        post.answers.push(comment);
        await comment.save();
        await post.save();
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

const upVote = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);
        if (!comment) return next(createError(404, "comment not found"));

        if (comment.upvotes.includes(userId))
            return next(createError(500, "You have already voted"));
        if (comment.downvotes.includes(userId)) {
            const index = comment.downvotes.indexOf(userId);
            comment.downvotes.splice(index, 1);
        }
        comment.upvotes.push(userId);
        const vote = comment.upvotes.length - comment.downvotes.length;
        comment.votes = vote;
        await comment.save();
        res.status(200).send("Your response has been recorded");
    } catch (error) {
        next(error);
    }
};

const downVote = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);
        if (!comment) return next(createError(404, "comment not found"));

        if (comment.downvotes.includes(userId))
            return next(createError(500, "You have already voted"));

        if (comment.upvotes.includes(userId)) {
            const index = comment.upvotes.indexOf(userId);
            comment.upvotes.splice(index, 1);
        }
        comment.downvotes.push(userId);
        const vote = comment.upvotes.length - comment.downvotes.length;
        comment.votes = vote;
        await comment.save();
        res.status(200).send("Your response has been recorded");
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const id = req.params.postId;
        const commentId = req.params.id;
        try {
            await Post.findByIdAndUpdate(id, { $pull: { answers: commentId } });
        } catch (error) {
            return next(error);
        }
        await Comment.findByIdAndDelete(commentId);
        res.status(200).send("Your response has been deleted");
    } catch (error) {
        next(error);
    }
};

const editComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updated = await Comment.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

const getComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cmt = await Comment.findById(id);
        res.status(200).json(cmt);
    } catch (error) {
        next(error);
    }
};

const getAllComments = async (req, res, next) => {
    try {
        const postId = req.query.postId;
        let comments;
        if (postId) comments = await Comment.find({ postId });
        else comments = await Comment.find({});
        res.status(201).json(comments);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComment,
    deleteComment,
    editComment,
    upVote,
    downVote,
    getComment,
    getAllComments,
};
