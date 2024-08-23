import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { ConnectToDB } from "./Database/ConnectToDb.js"
import { AuthRouter } from "./Routes/auth.route.js"
import { PostRouter } from "./Routes/post.route.js"


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",AuthRouter)
app.use("/api/post",PostRouter)


app.listen(process.env.PORT,async ()=>{
   await ConnectToDB()
    console.log("Server Started on PORT",process.env.PORT)
})