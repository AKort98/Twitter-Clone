import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import AuthRouter from './routes/auth.routes.js'
import PostsRouter from './routes/posts.routes.js'
import UserRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config()
mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected")
}).catch(err => {
    console.log(err)
})

app.use("/api/auth", AuthRouter)
app.use("/api/posts", PostsRouter)
app.use("/api/user", UserRouter)


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message
    })
})