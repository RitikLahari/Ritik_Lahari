const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Gallery = require('../models/Gallery');

// Ensure upload directories exist
let uploadDir = path.join(__dirname, '../uploads/gallery');
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  // Fallback to /tmp for serverless environments (AWS Lambda, Vercel, etc.)
  console.warn('Cannot create upload directory at ' + uploadDir + ', using /tmp instead:', err.message);
  uploadDir = '/tmp/gallery-uploads';
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  } catch (tmpErr) {
    // If /tmp also fails, just use a non-persistent path
    console.warn('Cannot create /tmp directory either, uploads will not be persisted:', tmpErr.message);
    uploadDir = '/tmp/gallery-uploads';
  }
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

// GET all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single gallery image
router.get('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new gallery image
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const gallery = new Gallery({
      title: req.body.title || req.file.originalname,
      description: req.body.description || '',
      imageUrl: `/uploads/gallery/${req.file.filename}`,
      category: req.body.category || 'general',
    });

    const newImage = await gallery.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE gallery image
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (req.body.title) image.title = req.body.title;
    if (req.body.description) image.description = req.body.description;
    if (req.body.category) image.category = req.body.category;
    if (req.file) {
      image.imageUrl = `/uploads/gallery/${req.file.filename}`;
    }
    image.updatedAt = Date.now();

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE gallery image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await Gallery.deleteOne({ _id: req.params.id });
    res.json({ message: 'Gallery image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
