/**
 * Vision API Service
 * Handles Google Vision API integration
 */

export const analyzeImageService = async (imageBase64) => {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;

  if (!apiKey) {
    console.warn('Vision API key not configured. Using simulated mode.');
    return simulateVisionAnalysis();
  }

  const base64Content = imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const requestBody = {
    requests: [
      {
        image: { content: base64Content },
        features: [
          { type: 'LABEL_DETECTION', maxResults: 15 },
          { type: 'SAFE_SEARCH_DETECTION', maxResults: 1 },
          { type: 'OBJECT_LOCALIZATION', maxResults: 5 },
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Vision API error:', err);
    return simulateVisionAnalysis();
  }
};

/**
 * Simulates Vision API response for demo/testing
 */
const simulateVisionAnalysis = () => {
  const rand = Math.random();

  if (rand < 0.65) {
    const categories = [
      'Pothole',
      'Garbage / Waste',
      'Broken Streetlight',
      'Water Leakage / Flooding',
      'Road Damage',
      'Illegal Dumping',
    ];
    return {
      success: true,
      category: categories[Math.floor(Math.random() * categories.length)],
      confidence: Math.floor(Math.random() * 15) + 82,
      labels: ['road', 'pavement', 'asphalt', 'outdoor', 'damage'],
      simulated: true,
    };
  } else if (rand < 0.85) {
    return {
      success: false,
      lowConfidence: true,
      reason: 'AI confidence below 80%. Sent for manual admin review.',
      confidence: Math.floor(Math.random() * 20) + 55,
      labels: ['outdoor', 'ground', 'surface'],
      simulated: true,
    };
  } else {
    const nonCivic = [
      'a food item',
      'a person',
      'an animal',
      'indoor furniture',
      'a vehicle interior',
    ];
    return {
      success: false,
      notCivic: true,
      reason: `This appears to be ${nonCivic[Math.floor(Math.random() * nonCivic.length)]}, not a civic issue.`,
      simulated: true,
    };
  }
};
