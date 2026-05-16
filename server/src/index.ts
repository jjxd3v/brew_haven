import './env.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import {
  corsMiddleware,
  corsOptions,
  getAllowedOrigins,
} from './config/cors.js';
import { seedMenuItems } from './seed/menuSeed.js';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS must run before other middleware and routes
app.use(corsMiddleware);
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

async function start() {
  await connectDB();
  await seedMenuItems();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`[cors] Allowed origins: ${getAllowedOrigins().join(', ')}`);
    console.log('[cors] Vercel *.vercel.app allowed in production');
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
