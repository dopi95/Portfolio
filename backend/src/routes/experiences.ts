import express from 'express';
import Experience from '../models/Experience';
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

// Get all experiences (public)
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});

// Create experience (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error creating experience' });
  }
});

// Update experience (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error updating experience' });
  }
});

// Delete experience (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting experience' });
  }
});

export default router;
