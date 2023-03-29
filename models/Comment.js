const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    votes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
