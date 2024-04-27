import mongoose from "mongoose";

const postShema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true }
);

const Post = mongoose.model("Post", postShema);
export default Post;