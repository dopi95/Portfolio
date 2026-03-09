import express from 'express';
import Testimonial from '../models/Testimonial';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Simple in-memory cache
let testimonialsCache: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all testimonials (public - only approved)
router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    
    // Return cached data if available and fresh
    if (testimonialsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.json(testimonialsCache);
    }
    
    // Fetch from database
    const testimonials = await Testimonial.find({ status: 'approved' })
      .select('name position message rating avatar photo order')
      .sort({ order: 1 })
      .limit(20)
      .lean();
    
    // Update cache
    testimonialsCache = testimonials;
    cacheTimestamp = now;
    
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Error fetching testimonials' });
  }
});

// Get all testimonials for admin (protected)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials' });
  }
});

// Submit testimonial (public)
router.post('/submit', async (req, res) => {
  try {
    const testimonial = new Testimonial({ ...req.body, status: 'pending' });
    await testimonial.save();
    res.json({ message: 'Testimonial submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting testimonial' });
  }
});

// Create testimonial (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    testimonialsCache = null; // Invalidate cache
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error creating testimonial' });
  }
});

// Approve/Reject testimonial (protected)
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    testimonialsCache = null; // Invalidate cache
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

// Update testimonial (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    testimonialsCache = null; // Invalidate cache
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial' });
  }
});

// Delete testimonial (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    testimonialsCache = null; // Invalidate cache
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial' });
  }
});

export default router;
