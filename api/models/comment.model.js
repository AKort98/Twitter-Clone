import mongoose from "mongoose";

const commentScehma = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
    postRef: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const Comment = mongoose.model("Comment", commentScehma);
export default Comment;