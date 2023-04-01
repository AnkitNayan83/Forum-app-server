const Comment = require("../models/Comment");
const Post = require("../models/Post");
const createError = require("./error");
const jwt = require("jsonwebtoken");

//verifying token (checkin whether use is loggedin or not)
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated"));
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return next(createError(403, "invalid token"));
        req.user = user; //creating new user field in our request
        next();
    });
};

// verifying whether this request on this post is made by its owner or not
const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
};

// verifying admin
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) next();
        else return next(createError(403, "You are not authorized"));
    });
};

// verifying whether this post belong to the user or not
const verifyPost = (req, res, next) => {
    verifyToken(req, res, async () => {
        const post = await Post.findById(req.params.id);
        if (post.author.toString() === req.user.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authenticated"));
        }
    });
};

const verifyComment = (req, res, next) => {
    verifyToken(req, res, async () => {
        let comment;
        try {
            comment = await Comment.findById(req.params.id);
        } catch (error) {
            return next(createError(502, "Bad gateway"));
        }
        if (comment.author.toString() === req.user.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authenticated"));
        }
    });
};

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyUser,
    verifyPost,
    verifyComment,
};
