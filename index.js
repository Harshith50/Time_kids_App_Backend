import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import mongoDB from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';

// App config
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
mongoDB();

// Routes
app.use('/api/blog', blogRoutes); 
app.use('/api/user', userRouter)

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
