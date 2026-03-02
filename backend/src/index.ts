import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import User from './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!)
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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
