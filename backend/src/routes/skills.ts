import express from 'express';
import Skill from '../models/Skill';
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

// Get all skills (public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 }).lean();
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

// Create skill (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const lastSkill = await Skill.findOne().sort({ order: -1 }).select('order').lean();
    const nextOrder = lastSkill ? (lastSkill.order || 0) + 1 : 1;
    
    const skill = new Skill({ ...req.body, order: nextOrder });
    await skill.save();
    res.json(skill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ message: 'Error creating skill' });
  }
});

// Update skill (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill' });
  }
});

// Delete skill (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

// Reorder skills (protected)
router.post('/reorder', verifyToken, async (req, res) => {
  try {
    const { items } = req.body;
    await Promise.all(
      items.map((item: any) =>
        Skill.findByIdAndUpdate(item._id, { order: item.order })
      )
    );
    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

export default router;
