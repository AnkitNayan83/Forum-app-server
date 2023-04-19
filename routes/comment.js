const router = require("express").Router();
const {
    createComment,
    deleteComment,
    upVote,
    downVote,
    editComment,
    getComment,
    getAllComments,
    getVote,
} = require("../controller/comment");
const { verifyToken, verifyComment } = require("../utils/verifyToken");

//VOTES
router.post("/upvote/:id", upVote);
router.post("/downvote/:id", downVote);
//CREATE
router.post("/create/:id", createComment);
//DELETE
router.delete("/:postId/:id", deleteComment);
//UPDATE
router.put("/:id", editComment);
// GET All
router.get("/all", getAllComments);
// GET
router.get("/:id", getComment);
// GET VOTE
router.get("/vote/:id", getVote);
module.exports = router;
