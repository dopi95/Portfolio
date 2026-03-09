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
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 }).lean();
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});

// Create experience (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const lastExperience = await Experience.findOne().sort({ order: -1 }).select('order').lean();
    const nextOrder = lastExperience ? (lastExperience.order || 0) + 1 : 1;
    
    const experience = new Experience({ ...req.body, order: nextOrder });
    await experience.save();
    res.json(experience);
  } catch (error) {
    console.error('Error creating experience:', error);
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

// Reorder experiences (protected)
router.post('/reorder', verifyToken, async (req, res) => {
  try {
    const { items } = req.body;
    await Promise.all(
      items.map((item: any) =>
        Experience.findByIdAndUpdate(item._id, { order: item.order })
      )
    );
    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

export default router;
