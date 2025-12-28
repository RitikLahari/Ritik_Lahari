const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blog = require('../models/Blog');

// Setup upload directory - determine best path for environment
// Always default to /tmp for production/serverless
let uploadDir = '/tmp/uploads/blog';

// Only try local directory in development
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'vercel') {
  uploadDir = path.join(__dirname, '../uploads/blog');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new blog post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author || 'Ritik Lahari',
      category: req.body.category || 'general',
      tags: req.body.tags ? req.body.tags.split(',') : [],
      imageUrl: req.file ? `/uploads/blog/${req.file.filename}` : null,
      published: req.body.published !== 'false',
    });

    const newPost = await blog.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE blog post
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.category) post.category = req.body.category;
    if (req.body.tags) post.tags = req.body.tags.split(',');
    if (req.file) {
      post.imageUrl = `/uploads/blog/${req.file.filename}`;
    }
    if (req.body.published !== undefined) {
      post.published = req.body.published !== 'false';
    }
    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE blog post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
