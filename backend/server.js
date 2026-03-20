import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import visionRoutes from './routes/vision.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger } from './middlewares/requestLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ===== MIDDLEWARES =====
app.use(requestLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve frontend from the correct path
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// ===== API ROUTES =====
app.use('/api/vision', visionRoutes);

// ===== PAGE ROUTES =====
const pages = {
  '/': 'pages/index.html',
  '/login': 'pages/index.html',
  '/citizen/dashboard': 'pages/citizen/dashboard.html',
  '/citizen/report': 'pages/citizen/report.html',
  '/citizen/voting': 'pages/citizen/voting.html',
  '/citizen/profile': 'pages/citizen/profile.html',
  '/citizen/warnings': 'pages/citizen/warning-history.html',
  '/citizen/appeal': 'pages/citizen/suspension-appeal.html',
  '/admin/dashboard': 'pages/admin/dashboard.html',
  '/admin/review': 'pages/admin/review.html',
  '/admin/flagged': 'pages/admin/flagged.html',
  '/dev/dashboard': 'pages/dev/dashboard.html',
  '/dev/training': 'pages/dev/training.html',
  '/dev/users': 'pages/dev/users.html',
  '/dev/analytics': 'pages/dev/analytics.html',
  '/priority': 'pages/priority.html',
  '/ledger': 'pages/ledger.html',
};

Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(frontendPath, file));
  });
});

// ===== ERROR HANDLING =====
app.use(errorHandler);

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Route not found' });
});

// ===== SERVER STARTUP =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 JanSetu AI running on http://localhost:${PORT}\n`);
});
