import mongoose from "mongoose";

const friendsSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    friend: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Friends = mongoose.model("Friend", friendsSchema);

export default Friends;