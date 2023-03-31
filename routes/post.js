const router = require("express").Router();
const {
    createPost,
    upVote,
    downVote,
    deletePost,
    updatePost,
    getAllPost,
    getPost,
} = require("../controller/post");
const { verifyUser, verifyToken } = require("../utils/verifyToken");

// CREATE POST
router.post("/", verifyToken, createPost);
// ADD VOTE
//UP
router.post("/upvote/:id", verifyToken, upVote);
//DOWN
router.post("/downvote/:id", verifyToken, downVote);
// DELETE POST
router.delete("/:id", verifyUser, deletePost);
// UPDATE POST
router.put("/:id", verifyUser, updatePost);
// GET ALL POST
router.get("/", getAllPost);
// GET POST
router.get("/:id", getPost);

module.exports = router;
