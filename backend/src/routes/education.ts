import express from 'express';
import Education from '../models/Education';
import jwt from 'jsonwebtoken';

const router = express.Router();

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 }).lean();
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const last = await Education.findOne().sort({ order: -1 }).select('order').lean();
    const education = new Education({ ...req.body, order: last ? (last.order || 0) + 1 : 1 });
    await education.save();
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error creating education' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error updating education' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting education' });
  }
});

export default router;
