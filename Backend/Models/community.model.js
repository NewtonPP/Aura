import mongoose from "mongoose";

const CommunitySchema = mongoose.Schema({
    Community:String,
    Description:String
})

export const CommunityModel = mongoose.model("Community", CommunitySchema)