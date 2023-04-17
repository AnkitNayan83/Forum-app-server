const router = require("express").Router();
const {
    createPost,
    upVote,
    downVote,
    deletePost,
    updatePost,
    getAllPost,
    getPost,
    getVotes,
} = require("../controller/post");
const { verifyToken, verifyPost } = require("../utils/verifyToken");

// CREATE POST
router.post("/", verifyToken, createPost);
// ADD VOTE
//UP
router.post("/upvote/:id", verifyToken, upVote);
//DOWN
router.post("/downvote/:id", verifyToken, downVote);
// DELETE POST
router.delete("/:id", verifyPost, deletePost);
// UPDATE POST
router.put("/:id", verifyPost, updatePost);
// GET ALL POST
router.get("/", getAllPost);
// GET POST
router.get("/:id", getPost);
// GET Votes
router.get("/vote/:id", getVotes);

module.exports = router;
