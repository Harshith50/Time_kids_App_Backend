import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import mongoDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoDB();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS for Vercel frontend
app.use(cors({
  origin:"https://time-kids-app-front-end.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true
}));

// API routes
app.use('/api/blog', blogRoutes);
app.use('/api/user', userRouter);

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
