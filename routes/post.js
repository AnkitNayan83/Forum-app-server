const router = require("express").Router();
const { createPost } = require("../controller/post");
const { verifyUser, verifyToken } = require("../utils/verifyToken");

// CREATE POST
router.post("/", verifyToken, createPost);
// ADD VOTE
// DELETE POST
// UPDATE POST
// GET ALL POST
// GET POST

module.exports = router;
