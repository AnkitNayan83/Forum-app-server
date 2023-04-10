const router = require("express").Router();
const {
    createComment,
    deleteComment,
    upVote,
    downVote,
    editComment,
    getComment,
    getAllComments,
} = require("../controller/comment");
const { verifyToken, verifyComment } = require("../utils/verifyToken");

//CREATE
router.post("/create/:id", verifyToken, createComment);
//VOTES
router.post("/upvote/:id", verifyToken, upVote);
router.post("/downvote/:id", verifyToken, downVote);
//DELETE
router.delete("/:postId/:id", verifyComment, deleteComment);
//UPDATE
router.put("/:id", verifyComment, editComment);
// GET All
router.get("/all", getAllComments);
// GET
router.get("/:id", getComment);

module.exports = router;
