import express from 'express';
import Project from '../models/Project';
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

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: 1 }).lean();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Create project (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    // Auto-increment order: get the highest order and add 1
    const lastProject = await Project.findOne().sort({ order: -1 }).select('order').lean();
    const nextOrder = lastProject ? (lastProject.order || 0) + 1 : 1;
    
    const project = new Project({ ...req.body, order: nextOrder });
    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
});

// Update project (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

// Delete project (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// Reorder projects (protected)
router.post('/reorder', verifyToken, async (req, res) => {
  try {
    const { items } = req.body;
    await Promise.all(
      items.map((item: any) =>
        Project.findByIdAndUpdate(item._id, { order: item.order })
      )
    );
    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

export default router;
