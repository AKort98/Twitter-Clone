import express from "express";
import { verifyToken } from "../utils/verifyUser.js"
import { addFriend, getFriends, getUserPosts, getFriendsPosts, addComment, updateUser, getUserProfile } from "../controllers/user.controller.js"

const router = express.Router();

router.get('/friends/:id', getFriends);
router.post('/add', verifyToken, addFriend)
router.get("/get-posts/:id", verifyToken, getUserPosts);
router.get('/get-friends-posts/:id', verifyToken, getFriendsPosts);
router.post('/add-comment/:id', verifyToken, addComment)
router.post('/update/:id', verifyToken, updateUser);
router.get('/username/:username', getUserProfile);



export default router;