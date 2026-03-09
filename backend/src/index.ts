import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import contactRoutes from './routes/contacts';
import skillRoutes from './routes/skills';
import projectRoutes from './routes/projects';
import experienceRoutes from './routes/experiences';
import testimonialRoutes from './routes/testimonials';
import uploadRoutes from './routes/upload';
import User from './models/User';

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connection pooling and optimization
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI!, {
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
})
  .then(async () => {
    console.log('MongoDB connected');
    
    // Create default admin user
    const existingUser = await User.findOne({ email: 'admin@portfolio.com' });
    if (!existingUser) {
      const defaultUser = new User({
        email: 'admin@portfolio.com',
        password: 'admin123',
        role: 'admin'
      });
      await defaultUser.save();
      console.log('Default admin user created: admin@portfolio.com / admin123');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Backend API', status: 'running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
