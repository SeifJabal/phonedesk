import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import connectDatabase from './config/database';
import redis from './config/redis';
import devisRoutes from './routes/devis';
import adminRoutes from './routes/admin';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev')); // Logging
app.use(compression()); // Response compression
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    message: 'PhoneDesk API v1',
    version: '1.0.0',
  });
});

// Log all incoming requests
app.use((req: Request, res: Response, next: any) => {
  console.log(`[Request] ${req.method} ${req.path}`);
  next();
});

app.use('/api/v1/devis', devisRoutes);
app.use('/api/v1/admin', adminRoutes);

console.log('[App] Routes registered: /api/v1/devis, /api/v1/admin');

// Log all requests for debugging
app.use((req: Request, res: Response, next: any) => {
  console.log(`[404] ${req.method} ${req.url} - Not found`);
  next();
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An error occurred' 
        : err.message,
    },
  });
});

export default app;
