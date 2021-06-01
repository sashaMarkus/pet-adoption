const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage.js');

const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
       await newPost.save()
       res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { type, name, hypoallergenic, height, image } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id '+id);
    
    const updatedPost = { type, name, hypoallergenic, height, image, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id '+id);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}