const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de prueba simple
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working', timestamp: new Date().toISOString() });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Test server working!');
});

app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});
