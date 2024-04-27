import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const createPost = async (req, res, next) => {

    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        next(error)
    }
}

export const fetchPostDetails = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOne({ _id: postId }).populate({
            path: 'userRef',
            select: 'username avatar',
            model: 'User'

        });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
}

export const fetchPostComments = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ postRef: postId }).populate({
            path: 'userRef',
            select: 'username avatar',
            model: 'User'
        })
        res.status(201).json(comments);
    } catch (error) {
        next(error);
    }
}

