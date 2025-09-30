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

// CORS - MUST be before routes
app.use(cors({
  origin: 'https://time-kids-app-front-end.vercel.app/',
  credentials: true,
}));


// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API routes - MUST come before static files
app.use('/api/blog', blogRoutes);
app.use('/api/user', userRouter);

// Serve React frontend ONLY in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // SPA fallback - MUST be last
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));