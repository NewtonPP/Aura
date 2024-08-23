import express from "express"
import { AddReply, CreatePost, DeletePost, GetPost, GetPosts } from "../Controller/postcontroller.js"

export const PostRouter = express.Router()

PostRouter.post("/createpost",CreatePost)
PostRouter.delete("/deletepost/:id",DeletePost)
PostRouter.get("/getposts",GetPosts)
PostRouter.get("/getpost/:id",GetPost)
PostRouter.post("/addreply",AddReply)

