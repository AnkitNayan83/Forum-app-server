const User = require("../models/User");
const Comment = require("../models/Comment");
const createError = require("../utils/error");
const Post = require("../models/Post");

const editUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const check = await User.findById(id);
        if (!check) return next(createError(404, "no user with this id found"));
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        res.status(201).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const check = User.findById(id);
        if (!check) return next(createError(404, "User not found"));
        //delete all votes
        //delete all comments
        try {
            await Comment.deleteMany({ author: id });
        } catch (error) {
            return next(error);
        }
        // delete all posts
        try {
            await Post.deleteMany({ author: id });
        } catch (error) {
            return next(error);
        }
        await User.findByIdAndDelete(id);
        res.status(201).send("User Deleted");
    } catch (error) {
        next(error);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const qName = req.query.name;
        let users;
        if (qName) {
            users = await User.find({ username: qName });
        } else {
            users = await User.find({});
        }
        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return next(createError(404, "user not found"));
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = { editUser, deleteUser, getAllUser, getUser };
