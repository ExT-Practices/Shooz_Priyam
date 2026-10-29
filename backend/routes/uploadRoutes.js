import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({
            message: 'Image uploaded successfully',
            imageUrl: req.file.path // Cloudinary URL
        });
    } else {
        res.status(400).json({ message: 'No image uploaded' });
    }
});

router.post('/multiple', protect, admin, upload.array('images', 5), (req, res) => {
    if (req.files && req.files.length > 0) {
        const imageUrls = req.files.map(file => file.path);
        res.json({
            message: 'Images uploaded successfully',
            imageUrls
        });
    } else {
        res.status(400).json({ message: 'No images uploaded' });
    }
});

export default router;
