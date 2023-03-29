const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photos: {
            type: Array[String],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        answers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        votes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
