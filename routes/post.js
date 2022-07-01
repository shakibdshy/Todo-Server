import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Create
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
});
// Update
router.put('/:id', async (req, res) => {
    const updateDoc = req.body;
    
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json(error)
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const postDelete = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({success : true});
    } catch (error) {
        res.status(500).json({ success : false, error : error.message})
    }
});

// Get
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(err)
    }
});

// Get All
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
});

export default router