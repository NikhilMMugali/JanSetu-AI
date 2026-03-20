import { analyzeImageService } from '../services/visionService.js';

/**
 * Controller for Vision API analysis
 */
export const analyzeImage = async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: true,
        message: 'No image provided.',
      });
    }

    // Call the service layer
    const result = await analyzeImageService(imageBase64);

    return res.json(result);
  } catch (error) {
    console.error('Vision API error:', error);
    return res.status(500).json({
      error: true,
      message: 'Vision API request failed.',
      simulated: true,
    });
  }
};
