import QuestionModel from "../Models/question.model.js"
import UserModel from "../Models/user.model.js"

export const CreatePost = async (req, res) => {
    try {
        const { Title, Description, CommunityID, isAnonymous, UserId } = req.body
        if (!Title) {
            return res.status(400).json({ message: "Your post must have a title" })
        }

        const UserPost = await QuestionModel.create({
            Title,
            Description,
            CommunityID,
            isAnonymous,
            UserId
        })

        // Populate the UserId field
        const populatedPost = await UserPost.populate("UserId")

        if (populatedPost) {
            return res.status(200).json(populatedPost)
        }
    } catch (error) {
        console.log("Error in the Create Post Controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const DeletePost = async (req, res) => {
    try {
        const { id } = req.params
        const DeletedPost = await QuestionModel.findByIdAndDelete(id, { new: true })

        if (DeletedPost) {
            res.status(200).json(DeletedPost)
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    } catch (error) {
        console.log("Error in the DeletePost Controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const GetPosts = async (req, res) => {
    try {
        const AllPosts = await QuestionModel.find().populate("UserId").populate("Replies.UserId")
        if (AllPosts.length > 0) {
            return res.status(200).json(AllPosts)
        } else {
            return res.status(404).json({ message: "There are no posts" })
        }
    } catch (error) {
        console.log("Error in the GetPosts Controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const GetPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await QuestionModel.findById(id)

        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    } catch (error) {
        console.log("Error in the GetPost Controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const AddReply = async (req, res) => {
    try {
        const { UserId, Reply, isAnonymous, id } = req.body
        const ReplyMessage = {
            UserId,
            reply: Reply,
            isAnonymous
        }
        const UpdatedPost = await QuestionModel.findByIdAndUpdate(
            id,
            { $push: { Replies: ReplyMessage } },
            { new: true }
        )
        res.status(200).json(UpdatedPost)
    } catch (error) {
        console.log("Error in the AddReply Controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
