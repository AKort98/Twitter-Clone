import Friends from "../models/friends.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

export const getUserPosts = async (req, res, next) => {
    try {
        const posts = await
            Post.find({ userRef: req.params.id })
                .populate({
                    path: 'userRef',
                    select: 'username avatar',
                    model: 'User'
                })
                .sort({ createdAt: -1 })
            ;
        res.status(201).json(posts);
    } catch (error) {
        next(error)
    }
};


export const getFriends = async (req, res, next) => {
    try {
        const friends = await Friends.find({ user: req.params.id });
        res.status(201).json(friends);
    } catch (error) {
        next(error);
    }
}

export const addFriend = async (req, res, next) => {
    try {
        const friend = await Friends.create(req.body);
        res.status(201).json(friend);
    } catch (error) {
        next(error);
    }
}

export const getFriendsPosts = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const offset = parseInt(req.query.offset) || 0; // Get offset from query parameter, default to 0


        // Find friends of the user
        const friends = await Friends.find({ user: userId });

        // Extract friendIds from friends
        const friendIds = friends.map(friend => friend.friend);

        friendIds.push(userId);


        // Find posts of friends and populate userRef to get username
        const tweets = await Post.find({ userRef: { $in: friendIds } })
            .populate({
                path: 'userRef',
                select: 'username avatar',
                model: 'User'
            })
            .sort({ createdAt: -1 }) // Sort by createdAt descending
            .limit(20) // Limit to 10 posts
            .skip(offset) // Skip 10 posts
            .exec();

        const totalPosts = await Post.countDocuments({ userRef: { $in: friendIds } });
        const nextOffset = offset + 20;
        const end = offset + 20 >= totalPosts;


        res.json({ tweets, nextOffset, end, totalPosts });
    }
    catch (error) {
        next(error);
    }
}
export const addComment = async (req, res, next) => {
    try {
        const content = req.body.content;
        const postRef = req.params.id;
        const userRef = req.body.userRef;
        const comment = await Comment.create({ content, postRef, userRef });
        res.status(201).json(comment);
    } catch (error) {
        next(error)
    }

}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const user = req.body;
    try {
        const update = await User.findByIdAndUpdate(userId, user, { new: true }).select('-password')
        res.status(201).json(update);
    } catch (error) {
        next(error);
    }

}

export const getUserProfile = async (req, res, next) => {
    const username = req.params.username;
    try {
        const user = await User.find({ username: username }).select('-password');
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}


