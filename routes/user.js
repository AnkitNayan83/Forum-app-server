const {
    editUser,
    deleteUser,
    getAllUser,
    getUser,
} = require("../controller/user");
const { verifyUser } = require("../utils/verifyToken");
const router = require("express").Router();

// Update user
router.put("/:id", verifyUser, editUser);
// Delete user
router.delete("/:id", deleteUser);
// find all user
router.get("/", getAllUser);
// find specific user
router.get("/:id", getUser);

module.exports = router;
