import express from 'express';
import Testimonial from '../models/Testimonial';
import jwt from 'jsonwebtoken';

const router = express.Router();

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
    const testimonials = await Testimonial.find({ status: 'approved' }).sort({ order: 1 }).lean();
    res.json(testimonials);
  } catch (error) {
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
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

// Update testimonial (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial' });
  }
});

// Delete testimonial (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial' });
  }
});

export default router;
