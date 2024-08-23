import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    FullName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Communities:[String],
},{timeStamp:true})

const UserModel = mongoose.model("User",UserSchema)

export default UserModel