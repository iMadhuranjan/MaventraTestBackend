import Post from "../models/Post.js";


export const createPost = async (req, res) => {
    try {
        const { title, subTitle, tags, content } = req.body;
        const author = req.user._id
        const newPost = new Post({ title, subTitle, tags, content, author });
        await newPost.save();
        res.status(201).json({ message: "Post created", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Failed to create post", error: err.message });
    }
}


export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });
        if (!post.author || post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized or author missing" });
        }


        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: "Failed to update post", error: err.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete post", error: err.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch posts", error: err.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name');
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: "Failed to get post", error: err.message });
    }
};

export const getPostsByTag = async (req, res) => {
    try {
        const tag = req.params.tag;
        const posts = await Post.find({ tags: tag });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch posts by tag", error: err.message });
    }
};
