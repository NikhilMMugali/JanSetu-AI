import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));

// ===== GOOGLE VISION AI PROXY =====
// Proxies Vision API calls server-side so the API key is never exposed to the browser
app.post('/api/vision/analyze', async (req, res) => {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;
  if (!apiKey) {
    return res.json({ error: true, message: 'Vision API not configured. Using simulated mode.', simulated: true });
  }

  const { imageBase64 } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ error: true, message: 'No image provided.' });
  }

  const base64Content = imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const requestBody = {
    requests: [{
      image: { content: base64Content },
      features: [
        { type: 'LABEL_DETECTION', maxResults: 15 },
        { type: 'SAFE_SEARCH_DETECTION', maxResults: 1 },
        { type: 'OBJECT_LOCALIZATION', maxResults: 5 }
      ]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Vision API error:', err);
    res.status(500).json({ error: true, message: 'Vision API request failed.', simulated: true });
  }
});

// Serve pages
const pages = {
  '/': 'index.html',
  '/login': 'login.html',
  '/citizen/dashboard': 'citizen-dashboard.html',
  '/citizen/report': 'citizen-report.html',
  '/citizen/voting': 'citizen-voting.html',
  '/citizen/profile': 'citizen-profile.html',
  '/admin/dashboard': 'admin-dashboard.html',
  '/admin/review': 'admin-review.html',
  '/dev/dashboard': 'dev-dashboard.html',
  '/dev/training': 'dev-training.html',
  '/dev/users': 'dev-users.html',
  '/dev/analytics': 'dev-analytics.html',
  '/priority': 'priority.html',
  '/ledger': 'ledger.html',
  '/citizen/warnings': 'warning-history.html',
  '/citizen/appeal': 'suspension-appeal.html',
  '/admin/flagged': 'admin-flagged.html',
};

Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', file));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`JanSetu AI running on http://localhost:${PORT}`);
});
