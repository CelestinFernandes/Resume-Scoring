import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';  // Make sure this is the correct path

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // This should route to auth.route.js

// MongoDB connection
const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
