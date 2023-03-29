const createError = require("../utils/error");
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
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized"));
        }
    });
};

// verifying admin
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) next();
        else return next(createError(403, "You are not authorized"));
    });
};

module.exports = { verifyToken, verifyAdmin, verifyUser };
