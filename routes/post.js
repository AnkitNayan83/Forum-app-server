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
router.post("/", createPost);
// ADD VOTE
//UP
router.post("/upvote/:id", upVote);
//DOWN
router.post("/downvote/:id", downVote);
// DELETE POST
router.delete("/:id", deletePost);
// UPDATE POST
router.put("/:id", updatePost);
// GET ALL POST
router.get("/", getAllPost);
// GET POST
router.get("/:id", getPost);
// GET Votes
router.get("/vote/:id", getVotes);

module.exports = router;
