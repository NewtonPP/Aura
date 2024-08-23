import express from "express"
import { Login, Logout, Signup } from "../Controller/auth.controller.js"

export const AuthRouter = express.Router()

AuthRouter.post("/signup", Signup)
AuthRouter.post("/login", Login)
AuthRouter.post("/logout", Logout)