import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    Title:String,
    Description:String,
    UserId:{type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    CommunityId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Community"
    },
    isAnonymous:Boolean,
    Replies:[{
        reply:String,
        UserId:{type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    }]
},{timestamps:true})

const QuestionModel = mongoose.model("Question",QuestionSchema)

export default QuestionModel