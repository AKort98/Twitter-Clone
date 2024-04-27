import express from "express";
import { verifyToken } from "../utils/verifyUser.js"
import { createPost, fetchPostDetails, fetchPostComments } from "../controllers/posts.controller.js";

const router = express.Router();

router.post("/create-post", verifyToken, createPost);
router.get("/post/:id", fetchPostDetails);
router.get("/post/comments/:id", fetchPostComments);


export default router;
