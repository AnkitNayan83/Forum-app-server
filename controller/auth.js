const createError = require("../utils/error");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const username = req.body.username;
        const checkUser = await User.findOne({ username });
        if (checkUser)
            return next(
                createError(500, "User with this username already exists")
            );

        const email = req.body.email;
        const checkEmail = await User.findOne({ email });
        if (checkEmail)
            return next(
                createError(500, "User with this email already exists")
            );

        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        res.status(201).send("User registered");
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username } = req.body;
        const checkUser = await User.findOne({ username });
        if (!checkUser)
            return next(createError(404, "Wrong username or password"));

        const pass_check = await bcrypt.compare(
            req.body.password,
            checkUser.password
        );

        if (!pass_check)
            return next(createError(400, "Wrong username or password"));

        const token = jwt.sign(
            { id: checkUser._id, isAdmin: checkUser.isAdmin },
            process.env.JWT_KEY
        );

        const { password, isAdmin, ...others } = checkUser._doc;

        res.cookie("access_token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: "auto",
        })
            .status(200)
            .json({ ...others });
    } catch (error) {
        next(error);
    }
};

module.exports = { login, register };
