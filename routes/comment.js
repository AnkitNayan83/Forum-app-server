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
router.post("/upvote/:id", verifyToken, upVote);
router.post("/downvote/:id", verifyToken, downVote);
//CREATE
router.post("/create/:id", verifyToken, createComment);
//DELETE
router.delete("/:postId/:id", verifyComment, deleteComment);
//UPDATE
router.put("/:id", verifyComment, editComment);
// GET All
router.get("/all", getAllComments);
// GET
router.get("/:id", getComment);
// GET VOTE
router.get("/vote/:id", getVote);
module.exports = router;
