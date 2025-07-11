import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    tags: [String],
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Post=mongoose.model("Post",PostSchema);
export default Post;
