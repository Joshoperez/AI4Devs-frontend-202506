import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import candidateRoutes from './routes/candidateRoutes';
import positionRoutes from './routes/positionRoutes';
import { uploadFile } from './application/services/fileUploadService';
import cors from 'cors';

// Extender la interfaz Request para incluir prisma
declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
    }
  }
}

dotenv.config();
const prisma = new PrismaClient();

// Test database connection
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });

export const app = express();
export default app;

// Middleware para parsear JSON. Asegúrate de que esto esté antes de tus rutas.
app.use(express.json());

// Middleware para adjuntar prisma al objeto de solicitud
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Middleware para permitir CORS desde http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware para capturar todas las peticiones y ver qué está pasando
app.use((req, res, next) => {
  console.log('=== INCOMING REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Path:', req.path);
  console.log('Base URL:', req.baseUrl);
  console.log('Original URL:', req.originalUrl);
  console.log('Headers:', req.headers);
  console.log('=======================');
  next();
});

// Import and use candidateRoutes
app.use('/candidates', candidateRoutes);

// Route for file uploads
app.post('/upload', uploadFile);

// Route to get candidates and interview flow by position
app.use('/positions', positionRoutes);

console.log('Routes registered:');
console.log('- /candidates');
console.log('- /upload (POST)');
console.log('- /positions');
console.log('- /test-db');
console.log('- / (root)');

// Endpoint de prueba para verificar la base de datos
app.get('/test-db', async (req, res) => {
  console.log('=== TEST-DB ENDPOINT CALLED ===');
  try {
    console.log('Attempting to connect to database...');
    const positions = await prisma.position.findMany();
    console.log('Database query successful, found positions:', positions.length);
    res.json({ 
      message: 'Database connection successful', 
      positionsCount: positions.length,
      positions: positions 
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: String(error) 
    });
  }
});

// Endpoint de prueba simple para verificar que las rutas funcionen
app.get('/test-simple', (req, res) => {
  console.log('=== TEST-SIMPLE ENDPOINT CALLED ===');
  res.json({ message: 'Simple test endpoint working', timestamp: new Date().toISOString() });
});

// Ruta raíz - debe ir al final para no interferir con otras rutas
app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

// Middleware de logging - movido al final para no interferir con las rutas
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request URL:', req.url);
  console.log('Request base URL:', req.baseUrl);
  console.log('Request original URL:', req.originalUrl);
  next();
});

const port = 8080;

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
