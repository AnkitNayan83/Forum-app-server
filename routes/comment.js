const router = require("express").Router();
const { createComment } = require("../controller/comment");
const { verifyToken } = require("../utils/verifyToken");

//CREATE
router.post("/:id", verifyToken, createComment);
//VOTES
//DELETE
//UPDATE
//GET ALL
// GET

module.exports = router;
