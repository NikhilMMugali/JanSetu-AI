import express from 'express';
import { analyzeImage } from '../controllers/visionController.js';

const router = express.Router();

/**
 * POST /api/vision/analyze
 * Analyzes an image using Google Vision API
 * Body: { imageBase64: string }
 * Returns: { labels: [], confidence: number, ... }
 */
router.post('/analyze', analyzeImage);

export default router;
